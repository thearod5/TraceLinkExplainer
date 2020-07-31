import ast
import os
import re

from gensim import corpora, models, matutils
from gensim.models import TfidfModel

import GVSM
from Preprocessor import Preprocessor, init_nlp, remove_stop_word, EntityPreprocessor
from model import Model
import pandas as pd


class PVSM:
    """VSM which use phrases instead of tokens"""

    def __init__(self):
        self.tfidf_model: TfidfModel = None
        self.pvsm_tmp_dir = os.path.dirname(__file__) + "/../../Data/tmp/PVSM/"
        self.processed_artifacts = dict()

    def build_model(self, source_artifacts, target_artifacts):
        print("Building PVSM model...")
        self.__process_artifacts(source_artifacts, target_artifacts)
        docs_tokens = []
        for art_id in self.processed_artifacts:
            docs_tokens.append([x.lower() for x in self.processed_artifacts[art_id]])
        dictionary = corpora.Dictionary(docs_tokens)
        corpus = [dictionary.doc2bow(x) for x in docs_tokens]
        self.tfidf_model = models.TfidfModel(corpus, id2word=dictionary)

    def __process_artifacts(self, source_artifacts, target_artifacts):
        if not os.path.isdir(self.pvsm_tmp_dir):
            os.makedirs(self.pvsm_tmp_dir)
        code_tokens_csv = self.pvsm_tmp_dir + "/processed_code.csv"
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

        req_tokens_csv = self.pvsm_tmp_dir + "/processed_req.csv"
        if os.path.isfile(req_tokens_csv):
            df = pd.read_csv(req_tokens_csv)
            for index, row in df.iterrows():
                token_list = ast.literal_eval(row["tokens"])
                self.processed_artifacts[row["id"]] = token_list
        else:
            init_nlp()
            df = pd.DataFrame()

            # np = Preprocessor()
            ep = EntityPreprocessor()
            for t_id in target_artifacts:
                content = target_artifacts[t_id]
                tokens = remove_stop_word(ep.get_phrases(content))

                self.processed_artifacts[t_id] = tokens
                df = df.append({"id": t_id, "tokens": tokens}, ignore_index=True)
            df.to_csv(req_tokens_csv)

    def parse_code(self, code_content):
        code_entities = []
        np = Preprocessor()
        code_tokens = re.split("[\.\s\(\)\<\>\:]", code_content)
        for ctk in code_tokens:
            ctk = np.clean_doc(ctk)
            if len(ctk) == 0:
                continue
            phrase = " ".join(np.split_camal_case(ctk))
            code_entities.append(phrase.lower())
        return code_entities

    def _get_doc_similarity(self, doc1_tk, doc2_tk):
        doc1_vec = self.tfidf_model[self.tfidf_model.id2word.doc2bow(doc1_tk)]
        doc2_vec = self.tfidf_model[self.tfidf_model.id2word.doc2bow(doc2_tk)]
        return matutils.cossim(doc1_vec, doc2_vec)

    def get_link_scores(self, source_artifacts, target_artifacts, limit=float('inf')):
        """
        Create links for raw dataset
        :param source_artifacts:`
        :param target_artifacts:
        :return:
        """
        print("start processing candidate links")
        links = []
        if os.path.isfile(self.pvsm_tmp_dir + "/links.csv"):
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

    def get_model_name(self):
        return "VSM"


class VSM(Model):
    def __init__(self, fo_lang_code, preprocessor):
        super().__init__(fo_lang_code)
        self.tfidf_model: TfidfModel = None
        self.preprocessor = preprocessor

    def build_model(self, doc_str):
        print("Building VSM model...")
        docs_tokens = []
        for doc in doc_str:
            docs_tokens.append(self.preprocessor.get_tokens(doc))
        dictionary = corpora.Dictionary(docs_tokens)
        corpus = [dictionary.doc2bow(x) for x in docs_tokens]
        self.tfidf_model = models.TfidfModel(corpus, id2word=dictionary)
        print("Finish building VSM model")

    def _get_doc_similarity(self, doc1_tk, doc2_tk):
        doc1_vec = self.tfidf_model[self.tfidf_model.id2word.doc2bow(doc1_tk)]
        doc2_vec = self.tfidf_model[self.tfidf_model.id2word.doc2bow(doc2_tk)]
        return matutils.cossim(doc1_vec, doc2_vec)

    def get_model_name(self):
        return "VSM"

    def get_word_weights(self, doc):
        res = {}
        tokens = self.preprocessor.get_tokens(doc)
        vec = self.tfidf_model[self.tfidf_model.id2word.doc2bow(tokens)]
        for id, tfidf in vec:
            idf = self.tfidf_model.idfs[id]
            token = self.tfidf_model.id2word[id]
            res[token] = idf
        return res


if __name__ == "__main__":
    docs = [
        'this is a test',
        'test assure quality',
        'test is important',
    ]
    vsm = VSM("en")
    vsm.build_model(docs)
    preprocessor = Preprocessor()
    new_doc1 = preprocessor.get_stemmed_tokens("software quality rely on test", "en")
    new_doc2 = preprocessor.get_stemmed_tokens("quality is important", "en")
    new_doc3 = preprocessor.get_stemmed_tokens("i have a pretty dog", "en")
