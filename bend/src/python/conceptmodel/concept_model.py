import os
from typing import List, Dict

import pandas as pd
from igraph import Graph, OUT

from Paths import PATH_TO_DATA

ANC = "ancestor"
CHILD = "child"
SIB = "sibling"
SYN = "synonym"


class WordRelationship:
    def __init__(self, word: str, relationship: str):
        self.word = word
        self.relationship = relationship


def to_groups(term_relations: Dict):
    """
    Establish word groups by applying BFS on term relation graph
    :param term_relations: dictionary to store relationship {term: [related terms..]}
    :return: concepts in group
    """
    all_terms = set()
    visited = set()
    res = list()
    for term in term_relations:
        all_terms.add(term)
        all_terms.union(term_relations[term])

    for term in all_terms:
        if term in visited:
            continue
        queue = [term]  # search queue for BFS
        group = set()
        while len(queue) > 0:
            cur_term = queue.pop()
            group.add(cur_term)
            visited.add(cur_term)
            for next_term in term_relations.get(cur_term, []):
                if next_term in visited:
                    continue
                queue.append(next_term)
        res.append(group)
    return res


class ConceptModel:
    def __init__(self):
        self.ig = Graph()  # use igraph to find path cause it is faster
        self.vertex_names = []

    def add_concepts(self, tsv_path):
        """
        Add concept and relationships in TSV format. This is adpator for persisted concept models
        :param tsv_path:
        :return:
        """
        df = pd.read_csv(tsv_path)
        df.to_csv(tsv_path, index=False)
        rels, left_terms, right_terms = [], [], []
        for index, row in df.iterrows():
            rel, lt, rt = row[0], row[1], row[2]
            rels.append(rel)
            left_terms.append(lt)
            right_terms.append(rt)
        self._add_concepts(rels, left_terms, right_terms)
        self.vertex_names = self.ig.vs.get_attribute_values("name")

    def _add_concepts(self, relationships: List, left_terms: List, right_terms: List):
        """
        Add concepts and relations in lists to the concept model.
        :param rel_dict:
        :return:
        """

        for type, lt, rt in zip(relationships, left_terms, right_terms):
            self.ig.add_vertex(lt)
            self.ig.add_vertex(rt)
            if type == SYN:
                self.ig.add_edge(lt, rt, label=SYN)
                self.ig.add_edge(rt, lt, label=SYN)
            if type == ANC:
                self.ig.add_edge(lt, rt, label=ANC)
                self.ig.add_edge(rt, lt, label=CHILD)

    def get_neighborhood(self, w1):
        if w1 not in self.vertex_names:
            return []
        neighbor_hood_indices = self.ig.neighbors(w1)
        return pd.Series(self.vertex_names)[set(neighbor_hood_indices)]

    def contains_vertex(self, vertex_name):
        return vertex_name in self.vertex_names

    def get_path(self, w1, w2):
        """
        Path from w1 to w2. If no path exist then will return empty list.
        The starting point of the path (w1) is not included in the returned path
        The end point (w2)) is included in the path
        :param w1:
        :param w2:
        :return:
        """

        if w1 not in self.vertex_names or w2 not in self.vertex_names:
            return []
        res = []
        if w1 and w2:
            path = self.ig.shortest_paths(w1, w2, mode=OUT)
            for n in path[0]:
                res.append(self.ig.vs[n]['name'])
        return res

    def get_word_relationships(self, source_word, target_words: [str]) -> [[WordRelationship]]:
        # TODO: Return dictionary containing target words as keys and [WordRelationship] as value
        targets = list(filter(lambda v: self.contains_vertex(v), target_words))
        edge_vertices = self.ig.get_shortest_paths(source_word, targets, output="epath")
        path: [WordRelationship] = []
        last_word = source_word
        if len(edge_vertices) == 0:
            return [[]]
        for edge_indices_in_path in edge_vertices:
            path_relationships = []
            for edge in self.ig.es[edge_indices_in_path]:
                target_name = self.ig.vs[edge.target]["name"]
                source_name = self.ig.vs[edge.source]["name"]
                new_vertex_name = target_name if source_name == last_word else source_name
                path_relationships.append(WordRelationship(new_vertex_name, edge["label"]))
                last_word = new_vertex_name
            path.append(path_relationships)
        return path

    def get_path_for_all(self, w1, w2_list, cutoff=5):
        """
        Return the simple path from w1 to all concepts in w2. All possible paths will be returned
        :param w1: source term
        :param w2_list: target terms in  list
        :param cutoff: the maximal path length
        :return:
        """
        paths = self.ig.get_all_simple_paths(w1, w2_list, cutoff=cutoff)
        all_path = []
        for p in paths:
            tmp = []
            for n in p:
                tmp.append(self.ig.vs[n]['name'])
            all_path.append(tmp)
        return all_path


dataset_paths = {
    "Drone": "dronology_data/ontology/database-relation.csv",
    "test": "dronology_data/ontology/test-relation.csv"
}


def get_concept_model_for_dataset(dataset_name: str) -> ConceptModel:
    path_to_concept_file = os.path.join(PATH_TO_DATA, dataset_paths[dataset_name])
    cm = ConceptModel()
    cm.add_concepts(path_to_concept_file)
    return cm
