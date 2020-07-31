import re

from nltk.parse.corenlp import CoreNLPParser
from subprocess import Popen, PIPE
from datetime import datetime

from Preprocessor import Preprocessor


class Model:
    def __init__(self, fo_lang_code, preprocessor=Preprocessor()):
        # set up stanford nlp java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer -preload
        # tokenize,ssplit,pos,lemma,parse,depparse  -status_port 9000 -port 9000 -timeout 15000 -serverProperties StanfordCoreNLP-
        # chinese.properties
        self.parser = CoreNLPParser()
        self.fo_lang_code = fo_lang_code
        self.preprocessor = preprocessor

    def _get_doc_similarity(self, doc1, doc2):
        raise NotImplementedError

    def get_model_name(self):
        raise NotImplementedError

    def get_link_scores_with_processed_artifacts(self, candidates):
        """
        Take the artifacts as a list of tokens. candidates are in format of [(s_id,s_content),(t_id,t_content)]
        :return:
        """
        res = []
        for candidate in candidates:
            source_artifact = candidate[0]
            s_id = source_artifact[0]
            s_content = source_artifact[1]

            target_artifact = candidate[1]
            t_id = target_artifact[0]
            t_content = target_artifact[1]

            score = self._get_doc_similarity(s_content.split(), t_content.split())
            res.append((s_id, t_id, score))
        return res

    def link_comply_with_time_constrain(self, issue_create_time_str, issue_close_time_str, commit_time_str) -> bool:
        """
        This rule will only impact 100 gold links
        :param issue_close_time_str:
        :param commit_time_str:
        :return:
        """
        if issue_close_time_str == 'None' or issue_close_time_str is None:
            return True
        issue_close = datetime.strptime(issue_close_time_str.split()[0], '%Y-%m-%d')  # 2018-10-16 01:48:56
        issue_create = datetime.strptime(issue_create_time_str.split()[0], '%Y-%m-%d')
        commit_create = datetime.strptime(commit_time_str.split()[0], '%Y-%m-%d')  # 2018-10-26 20:06:02+08:00

        if (issue_close < commit_create or issue_create > commit_create):
            return False
        return True

    def get_link_scores(self, source_artifacts, target_artifacts, limit=float('inf')):
        """
        Create links for raw dataset
        :param source_artifacts:
        :param target_artifacts:
        :return:
        """
        print("start processing candidate links")
        links = []
        self.processed_artifacts = dict()
        for s_id in source_artifacts:
            content = source_artifacts[s_id]
            tokens = self.preprocessor.get_tokens(content)
            self.processed_artifacts[s_id] = tokens
        for t_id in target_artifacts:
            content = target_artifacts[t_id]
            tokens = self.preprocessor.get_tokens(content)
            self.processed_artifacts[t_id] = tokens

        total = len(source_artifacts) * len(target_artifacts)
        cnt = 0
        for s_id in source_artifacts:
            for t_id in target_artifacts:
                if cnt > limit:
                    break
                cnt += 1
                if cnt % 1000 == 0:
                    print(str(cnt) + "/" + str(total))
                s_tokens = self.processed_artifacts[s_id]
                t_tokens = self.processed_artifacts[t_id]
                score = self._get_doc_similarity(s_tokens, t_tokens)
                links.append((s_id, t_id, score))
        return links

    def split_tokens_by_lang(self, tokens):
        lang_dict = {}
        lang_dict['en'] = []
        lang_dict[self.fo_lang_code] = []
        for token in tokens:
            m = re.match("^[a-zA-Z]+$", token)
            if not m:
                lang_dict[self.fo_lang_code].append(token)
            else:
                lang_dict['en'].append(token)
        return lang_dict

    def startStanforNLP(self):
        stanforNLP_server_cmd = " java -mx4g -cp * edu.stanford.nlp.pipeline.StanfordCoreNLPServer -preload tokenize,ssplit,pos,lemma,parse,depparse  -status_port 9000 -port 9000 -timeout 15000 -serverProperties StanfordCoreNLP-chinese.properties"
        self.start_server = Popen(stanforNLP_server_cmd.split(), cwd="G:\lib\stanford-corenlp-full-2016-10-31",
                                  stderr=PIPE, stdout=PIPE, shell=True)

        while (True):
            line = str(self.start_server.stderr.readline())
            print(line)
            success_mark = 'StanfordCoreNLPServer listening at'
            except_mark = 'Address already in use'
            if success_mark in line:
                print("server started...")
                break
            elif except_mark in line:
                print("server already started or port occupied...")
                break
        self.start_server.stderr.close()
        self.start_server.stdout.close()

    def dot(self, A, B):
        return sum(a * b for a, b in zip(A, B))

    def cosine_similarity(self, a, b):
        return self.dot(a, b) / ((self.dot(a, a) ** .5) * (self.dot(b, b) ** .5))


if __name__ == "__main__":
    pass
