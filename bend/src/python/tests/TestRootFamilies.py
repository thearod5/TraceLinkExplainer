import unittest

import numpy as np

from models.TracePayload import TraceRelationships
from models.WordDescriptor import WordDescriptor
from vsm.WordRootRelationships import add_root_families, get_vsm_weights, create_word_similarity_dictionary


class TestRootFamilies(unittest.TestCase):
    def runTest(self):
        self.test_create_word_similarity_dictionary()
        self.test_create_word_similarity_dictionary_cutoff()
        self.test_create_word_similarity_dictionary_normalize()
        self.test_get_vsm_weights()
        self.test_add_root_families()

    def test_add_root_families(self):
        source_words = ["unman", "plane", "car"]
        target_words = ["unman", "plane", "train"]

        families = {}
        initial_relationships = TraceRelationships(families,
                                                   list(map(WordDescriptor, source_words)),
                                                   list(map(WordDescriptor, target_words)))
        relationships = add_root_families("Drone", initial_relationships, -1)

        families = relationships.families
        self.assertEqual(1, families["unman"].weight)
        self.assertEqual("unman", families["unman"].concepts[0])
        self.assertEqual(1, families["plane"].weight)
        self.assertEqual(0, families["car"].weight)
        self.assertEqual(0, families["train"].weight)

        source_descriptors = relationships.source_descriptors
        source_word = source_descriptors[0]
        self.assertEqual("unman", source_word.word)
        self.assertEqual(["unman"], source_word.families)

    def test_get_vsm_weights(self):
        source_root_words = ["unman", "plane", "car"]
        target_root_words = ["unman", "plane", "train"]
        weights = get_vsm_weights(source_root_words, target_root_words, -1)

        self.assertEqual(1, weights["unman"])
        self.assertEqual(1, weights["plane"])
        self.assertEqual(0, weights["car"])
        self.assertEqual(0, weights["train"])

    def test_create_word_similarity_dictionary_normalize(self):
        word_index_mapping = {"hello": 0, "world": 1}
        similarity_matrix = np.array([[0.5, 0.3]])
        result = create_word_similarity_dictionary(word_index_mapping,
                                                   similarity_matrix,
                                                   -1,
                                                   True)
        self.assertEqual(1, result["hello"])
        self.assertEqual(0, result["world"])

    def test_create_word_similarity_dictionary_cutoff(self):
        word_index_mapping = {"hello": 0, "world": 1}
        similarity_matrix = np.array([[0.5, 0.3]])
        result = create_word_similarity_dictionary(word_index_mapping,
                                                   similarity_matrix,
                                                   0.4,
                                                   False)
        self.assertEqual(0.5, result["hello"])
        self.assertFalse("word" in result)

    def test_create_word_similarity_dictionary(self):
        word_index_mapping = {"hello": 0, "world": 1}
        similarity_matrix = np.array([[0.5, 0.3]])
        result = create_word_similarity_dictionary(word_index_mapping,
                                                   similarity_matrix,
                                                   -1,
                                                   False)
        self.assertEqual(0.5, result["hello"])
        self.assertEqual(0.3, result["world"])
