import os, re
import javalang
import networkx as nx
import nltk

from javalang.tree import ReferenceType
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
from javalang.tree import ReferenceType
import pandas as pd

Dronology_src = "../Data/dronology_data"

ANC = "ancestor"
SIB = "sibling"
SYN = "synonym"


class OntologyManger:
    """
    Check if two concepts are related and give reasons why they are related.
    """

    def __init__(self, code_root_dir=os.path.dirname(__file__) + "/../Data/dronology_data/Dronology-DATASET_V001",
                 ontology_file=os.path.dirname(__file__) + "/../Data/dronology_data/ontology/database-relation.txt"):
        self.g = nx.DiGraph()
        self.ontology_match_cache = dict()
        self.build_cha(code_root_dir)
        self.build_ontology(ontology_file)
        self.analyze_onotology(self.g)
        self.remove_ontology(black_list=['uav', 'ua', 'uavs', 'command'])
        print("Built ontology for dronology project")
        self.rel_cache = dict()
        self.path_cache = dict()
        self.ps = nltk.PorterStemmer()

    def remove_ontology(self, black_list):
        for term in black_list:
            if term in self.g:
                self.g.remove_node(term)

    def analyze_onotology(self, graph):
        ontology_analysis = os.path.dirname(__file__) + "/../Data/dronology_data/ontology/ontology_analysis.csv"
        E = graph.edges
        df = pd.DataFrame()
        t1 = []
        t2 = []
        rel = []
        for e in E:
            t1.append(e[0])
            t2.append(e[1])
            rel.append(graph[e[0]][e[1]]['label'])
        df['t1'] = t1
        df['t2'] = t2
        df['rel'] = rel
        df.to_csv(ontology_analysis)

    def camel_case_split(self, identifier):
        matches = re.finditer('.+?(?:(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|$)', identifier)
        parts = [m.group(0) for m in matches]
        return parts

    def build_ontology(self, file_path):
        with open(file_path, encoding='utf8') as fin:
            for i, line in enumerate(fin):
                if i == 0:
                    continue

                parts = line.split("\t")
                type = parts[0]
                lt = re.sub("_", " ", parts[1]).lower()
                rt = re.sub("_", " ", parts[2]).lower()

                self.g.add_node(lt)
                self.g.add_node(rt)
                if type == SIB:
                    # continue
                    self.g.add_edge(lt, rt, label=SIB)
                    self.g.add_edge(rt, lt, label=SIB)
                if type == SYN:
                    self.g.add_edge(lt, rt, label=SYN)
                    self.g.add_edge(rt, lt, label=SYN)
                if type == ANC:
                    self.g.add_edge(lt, rt, label=ANC)

    def build_cha(self, dir_root):
        """
        Build Class Hierarchy Tree from Java code
        :param dir_root:
        :return:
        """
        for dirName, subdirList, fileList in os.walk(dir_root):
            for fname in fileList:
                if fname.endswith(".java"):
                    file_path = os.path.join(dirName, fname)
                    with open(file_path) as fin:
                        ast = javalang.parse.parse(fin.read())
                        for path, class_node in ast.filter(javalang.tree.ClassDeclaration):
                            class_name = " ".join(self.camel_case_split(class_node.name)).lower()
                            extends = class_node.implements
                            implements = class_node.extends
                            self.g.add_node(class_name)
                            if extends is not None:
                                for parent_class in extends:
                                    parent_class_name = " ".join(self.camel_case_split(parent_class.name)).lower()
                                    self.g.add_node(parent_class_name)
                                    self.g.add_edge(parent_class_name, class_name, label=ANC)
                            if implements is not None:
                                for interface in implements:
                                    if isinstance(interface, ReferenceType):
                                        interface_name = " ".join(self.camel_case_split(interface[1].name)).lower()
                                        self.g.add_node(interface_name)
                                        self.g.add_edge(interface_name, class_name, label=ANC)

    def relevance_score(self, w1, w2):
        if w1 == "?" or w2 == "?":
            return 0
        w1 = w1.lower()
        w2 = w2.lower()
        tokens1 = w1.split()
        tokens2 = w2.split()

        # s_word, l_word = None, None
        # if len(tokens1) == 1 and len(tokens2) > 1:
        #     s_word, l_word = w1, tokens2
        # elif len(tokens1) > 1 and len(tokens2) == 1:
        #     s_word, l_word = w2, tokens1
        # if l_word is not None:
        #     for tk in l_word:
        #         if s_word in tk:
        #             return 1

        valid = False
        for p1 in tokens1:
            for p2 in tokens2:
                if valid:
                    break
                if p1 in p2 or p2 in p1:
                    valid = True
                    if valid:
                        break
        if valid:
            return fuzz.WRatio(w1, w2)
        else:
            return 0

    def get_path(self, w1, w2):
        w1 = w1.lower()
        w2 = w2.lower()
        # if self.ps.stem(w1) == self.ps.stem(w2):
        #     return None
        try:
            cost_path = self.get_path_with_cost(w1, w2)
            if cost_path is not None:
                return cost_path
        except Exception as e:
            pass
        return None

    def is_related(self, w1, w2):
        if self.ps.stem(w1) == self.ps.stem(w2):
            return 1
        elif fuzz.token_set_ratio(w1, w2) > 95:
            return 1
        else:
            path = self.get_path(w1, w2)
            return 1 if path is not None else 0

    def get_best_match_in_ontology(self, word):
        if word not in self.ontology_match_cache:
            w_match, w_score = process.extractOne(word, set(self.g.nodes), scorer=fuzz.token_set_ratio)
            if w_score >= 90:
                self.ontology_match_cache[word] = w_match
            else:
                self.ontology_match_cache[word] = None
        return self.ontology_match_cache[word]

    def get_path_with_cost(self, w1, w2):
        if (w1, w2) in self.path_cache:
            return self.path_cache[(w1, w2)]
        # if w1 == "command ids" and w2 == "movement command":
        #     a = 0
        if w1 in self.g and w2 in self.g:
            w1_match = self.g[w1]
            w2_match = self.g[w2]
        else:
            w1_match = self.get_best_match_in_ontology(w1)
            w2_match = self.get_best_match_in_ontology(w2)

        if w1_match and w2_match:
            path = nx.single_source_dijkstra(self.g, w1_match, w2_match)
            self.path_cache[(w1, w2)] = [w1] + path[1] + [w2]
            return self.path_cache[(w1, w2)]
        else:
            return None

    # def is_related(self, w1, w2):
    #     """
    #     check if the given two words are related to each other by analyzing their location in CHA,UDO and W2V
    #     :param w1:
    #     :param w2:
    #     :return:
    #     """
    #     if w1 == "?" or w2 == "?":
    #         return False
    #     lca_flag = False
    #     syntax_flag = False
    #     ontology_flag = False
    #
    #     lca = self.cha.lowest_common_ancestor(w1, w2)
    #     if fuzz.WRatio(w1, lca) >= 95 or fuzz.WRatio(lca, w2) >= 95:
    #         lca_flag = True
    #
    #     syntax_sim = fuzz.WRatio(w1, w2)
    #     if syntax_sim > 85:
    #         syntax_flag = True
    #     # syntax_partial_sim = fuzz.partial_ratio(w1, w2)  # the short word is a fuzz substring of the longer one
    #     # if syntax_sim >= 85 and syntax_partial_sim >= 90:
    #     #     syntax_flag = True
    #
    #     try:
    #         cost_path = self.udo.get_path_with_cost(w1, w2)
    #         if cost_path is not None:
    #             cost, path = cost_path
    #             if cost < 4:
    #                 ontology_flag = True
    #     except Exception as e:
    #         print(e)
    #
    #     return lca_flag or syntax_flag or ontology_flag

    def print_stat(self):
        phrase_process = lambda phrase: " ".join([self.ps.stem(x) for x in phrase.split()])
        cp_num = len(set([phrase_process(x) for x in set(self.g.nodes)]))

        synonym_num = len([x for x in self.g.edges.data() if x[2]["label"] == SYN])
        ancestor_num = len([x for x in self.g.edges.data() if x[2]["label"] == ANC])
        sibling_num = len([x for x in self.g.edges.data() if x[2]["label"] == SIB])
        print({
            "concept nums": cp_num,
            "synonym_num": synonym_num,
            "ancestor_num": ancestor_num,
            "sibling_num": sibling_num
        })


if __name__ == "__main__":
    om = OntologyManger()
    om.print_stat()
    print("Finished")
