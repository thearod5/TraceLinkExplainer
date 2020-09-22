import math
import os
import re

from gensim import corpora, models, matutils
import ast
import CodeParser
from Preprocessor import Preprocessor, EntityPreprocessor, remove_stop_word, init_nlp
from ontologyManger import OntologyManger
import pandas as pd


class GVSM:
    def __init__(self, ontology_manager: OntologyManger, reuse_relation_cache=True):
        self.tfidf_model = None
        self.ontology_manager = ontology_manager
        self.processed_artifacts = dict()
        self.gvsm_tmp_dir = os.path.dirname(__file__) + "/../../Data/tmp/GVSM/"

    def __process_artifacts(self, source_artifacts, target_artifacts):
        if not os.path.isdir(self.gvsm_tmp_dir):
            os.makedirs(self.gvsm_tmp_dir)
        code_tokens_csv = self.gvsm_tmp_dir + "/processed_code.csv"
        if os.path.isfile(code_tokens_csv):
            df = pd.read_csv(code_tokens_csv)
            for index, row in df.iterrows():
                token_list = ast.literal_eval(row["tokens"])
                self.processed_artifacts[row["id"]] = token_list
        else:
            init_nlp()
            df = pd.DataFrame()
            for s_id in source_artifacts:
                content = source_artifacts[s_id]
                tokens = remove_stop_word(self.parse_code(content))
                self.processed_artifacts[s_id] = tokens
                df = df.append({"id": s_id, "tokens": tokens}, ignore_index=True)
            df.to_csv(code_tokens_csv)

        req_tokens_csv = self.gvsm_tmp_dir + "/processed_req.csv"
        if os.path.isfile(req_tokens_csv):
            df = pd.read_csv(req_tokens_csv)
            for index, row in df.iterrows():
                token_list = ast.literal_eval(row["tokens"])
                self.processed_artifacts[row["id"]] = token_list
        else:
            init_nlp()
            df = pd.DataFrame()
            np = Preprocessor()
            ep = EntityPreprocessor()
            for t_id in target_artifacts:
                content = target_artifacts[t_id]
                tokens = remove_stop_word(ep.get_phrases(content))
                tokens.extend(np.get_tokens(content))
                self.processed_artifacts[t_id] = tokens
                df = df.append({"id": t_id, "tokens": tokens}, ignore_index=True)
            df.to_csv(req_tokens_csv)

    def build_model(self, source_artifacts, target_artifacts):
        print("Building GVSM model...")
        self.__process_artifacts(source_artifacts, target_artifacts)
        docs_tokens = []
        for art_id in self.processed_artifacts:
            docs_tokens.append([x.lower() for x in self.processed_artifacts[art_id]])
        dictionary = corpora.Dictionary(docs_tokens)
        corpus = [dictionary.doc2bow(x) for x in docs_tokens]
        self.tfidf_model = models.TfidfModel(corpus, id2word=dictionary)

    def __get_term_similarity(self, token1, token2):
        return self.ontology_manager.is_related(token1, token2)

    def parse_code(self, code_content):
        # parser = CodeParser.JavaParser()
        code_entities = []
        #
        # # extract the natural language part e.g. comments
        # ep = EntityPreprocessor()
        # if parser is not None:
        #     parser.parse(code_content)
        #     comments = parser.get_comments()
        #     for cm in comments:
        #         cm = parser.clean_doc(cm)
        #         code_entities.extend(ep.get_phrases(cm))

        # extract tokens from code then split by camel case
        np = Preprocessor()
        code_tokens = re.split("[\.\s\(\)\<\>\:]", code_content)
        for ctk in code_tokens:
            ctk = np.clean_doc(ctk)
            if len(ctk) == 0:
                continue
            phrase = " ".join(np.split_camal_case(ctk))
            code_entities.append(phrase.lower())
        code_entities.extend(np.get_tokens(code_content))
        return code_entities

    def get_link_scores(self, source_artifacts, target_artifacts, limit=float('inf')):
        """
        Create links for raw dataset
        :param source_artifacts:`
        :param target_artifacts:
        :return:
        """
        print("start processing candidate links")
        links = []
        if os.path.isfile(self.gvsm_tmp_dir + "/links.csv"):
            pass
        else:
            total = len(source_artifacts) * len(target_artifacts)
            cnt = 0
            for s_id in source_artifacts:
                for t_id in target_artifacts:
                    if cnt > limit:
                        break
                    cnt += 1
                    if cnt % 1000 == 0:
                        print("progress:" + str(cnt) + "/" + str(total))
                    s_tokens = self.processed_artifacts[s_id]
                    t_tokens = self.processed_artifacts[t_id]
                    score = self._get_doc_similarity(s_tokens, t_tokens)
                    links.append((s_id, t_id, score))
        return links

    def _get_doc_similarity(self, doc1_tk, doc2_tk):
        doc1_tk = [x.lower() for x in doc1_tk]
        doc2_tk = [x.lower() for x in doc2_tk]
        id2token: dict = self.tfidf_model.id2word  # wd id to tokens as a dictionary
        doc1_vec = self.tfidf_model[self.tfidf_model.id2word.doc2bow(doc1_tk)]
        doc2_vec = self.tfidf_model[self.tfidf_model.id2word.doc2bow(doc2_tk)]

        doc1_dict = dict(doc1_vec)
        doc2_dict = dict(doc2_vec)

        acc_sum = 0
        for id_i in doc1_dict:
            tk_i = id2token[id_i]
            tfidf_i_doc1 = doc1_dict.get(id_i, 0)
            for id_j in doc2_dict:
                tk_j = id2token[id_j]
                tfidf_j_doc2 = doc2_dict.get(id_j, 0)
                term_similarity = self.__get_term_similarity(tk_i, tk_j)
                acc_sum += tfidf_i_doc1 * tfidf_j_doc2 * term_similarity
                # print(tfidf_i_doc1, tfidf_j_doc2, term_similarity)

        vec1len = 1.0 * math.sqrt(sum(val * val for val in doc1_dict.values()))
        vec2len = 1.0 * math.sqrt(sum(val * val for val in doc2_dict.values()))

        if acc_sum == 0 or vec1len == 0 or vec2len == 0:
            score = 0
        else:
            score = acc_sum / (vec1len * vec2len)
        return score

    def get_model_name(self):
        return "GVSM"

    def get_word_weights(self):
        dfs = self.tfidf_model.dfs
        idfs = self.tfidf_model.idfs
        res = []
        for termid in dfs:
            word = self.tfidf_model.id2word[termid]
            idf = idfs.get(termid)
            res.append((word, idf))
        return res


if __name__ == "__main__":
    docs = [
        'this is a test',
        'test assure quality',
        'test is important',
    ]
    vsm = GVSM("en")
    vsm.build_model(docs)
    preprocessor = Preprocessor()
    new_doc1 = preprocessor.get_tokens("software quality rely on test", "en")
    new_doc2 = preprocessor.get_tokens("quality is important", "en")
    new_doc3 = preprocessor.get_tokens("i have a pretty dog", "en")
