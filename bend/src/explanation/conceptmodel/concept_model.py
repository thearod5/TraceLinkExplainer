import os
from typing import List, Dict

import pandas as pd
from igraph import Graph, OUT

from explanation.models.trace_information import WordRelationshipNode, Relationship, SYN, ANC, CHILD
from paths import PATH_TO_DATA

CONCEPT_MODEL_WEIGHT = 1

ONTOLOGY_RELATION_PATHS = {
    "Drone": "Drone/ontology/database-relation.csv",
    "test": "test/ontology/test-relation.csv"
}


class ConceptModel(object):
    """
    Represents a graph of related concepts used to calculate how similar
    two concepts are from each other.
    """

    def __init__(self, project_id: str):
        self.project_id = project_id
        self.ig = Graph()
        self.vertex_names = []
        self._load_concepts()

    def _load_concepts(self):
        """
        Add concept and relationships in CSV format. This is adaptor for persisted concept models.
        """
        path_to_concept_model = os.path.join(PATH_TO_DATA, ONTOLOGY_RELATION_PATHS[self.project_id])
        concepts_df = pd.read_csv(path_to_concept_model)
        relationships, left_terms, right_terms = [], [], []
        for index, row in concepts_df.iterrows():
            rel, lt, rt = row[0], row[1], row[2]
            relationships.append(rel)
            left_terms.append(lt)
            right_terms.append(rt)
        self._add_concepts(relationships, left_terms, right_terms)
        self.vertex_names = self.ig.vs.get_attribute_values("name")

    def _add_concepts(self, relationships: List, left_terms: List, right_terms: List):
        """
        Add concepts and relations in lists to the concept model.
        """

        for r_type, left_term, right_term in zip(relationships, left_terms, right_terms):
            self.ig.add_vertex(left_term)
            self.ig.add_vertex(right_term)
            if r_type.upper() == SYN:
                self.ig.add_edge(left_term, right_term, label=SYN)
                self.ig.add_edge(right_term, left_term, label=SYN)
            if r_type.upper() == ANC:
                self.ig.add_edge(left_term, right_term, label=ANC)
                self.ig.add_edge(right_term, left_term, label=CHILD)

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

    def get_word_relationships(self, source_word, target_words: [str]) -> [Relationship]:
        """
        Returns
        :param source_word:
        :param target_words:
        :return:
        """
        if not self.contains_vertex(source_word):
            return []
        defined_target_vertices = list(filter(lambda v: self.contains_vertex(v), target_words))
        if len(defined_target_vertices) == 0:
            return []

        path_to_target_words = self.ig.get_shortest_paths(source_word, defined_target_vertices, output="epath")

        relationships: [WordRelationshipNode] = []
        last_word = source_word
        for target_node_index, edge_indices_in_path in enumerate(path_to_target_words):
            relationship_nodes = [WordRelationshipNode(source_word, "SOURCE")]
            for edge in self.ig.es[edge_indices_in_path]:
                word_node = get_word_node(self.ig.vs, edge, last_word)
                relationship_nodes.append(word_node)
                last_word = word_node.word
            title = "%s->%s" % (source_word, defined_target_vertices[target_node_index])

            relationships.append(Relationship(title, relationship_nodes, CONCEPT_MODEL_WEIGHT))
        return relationships

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


class ConceptModelFactory():
    projects: List[str] = []  # represents list of dataset ids loaded
    models: Dict[str, ConceptModel] = {}

    @staticmethod
    def get_model(project_id: str):
        if project_id in ConceptModelFactory.projects:
            return ConceptModelFactory.models[project_id]

        new_concept_model = ConceptModel(project_id)
        ConceptModelFactory.models[project_id] = new_concept_model
        ConceptModelFactory.projects.append(project_id)

        return new_concept_model


def get_word_node(vertices, edge, last_word: str):
    target_name = vertices[edge.target]["name"]
    source_name = vertices[edge.source]["name"]
    new_vertex_name = target_name if source_name == last_word else source_name
    return WordRelationshipNode(new_vertex_name, edge["label"])
