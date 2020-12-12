import numpy as np
from django.test import TestCase

from explanation.models.TraceInformation import TraceExplanation, Relationship
from explanation.models.WordDescriptor import WordDescriptor
from explanation.relationships.vsm.VSMRelationships import add_root_relationships, get_vsm_weights, \
    create_word_similarity_dictionary


class TestRootFamilies(TestCase):

    def test_add_root_families(self):
        source_words = ["unman", "plane", "car"]
        target_words = ["unman", "plane", "train"]

        initial_explanation = TraceExplanation(list(map(WordDescriptor, source_words)),
                                               list(map(WordDescriptor, target_words)))
        explanation_with_roots: TraceExplanation = add_root_relationships("Drone", initial_explanation, -1)

        relationships: [Relationship] = explanation_with_roots.relationships

        self.assertEqual(4, len(relationships))

        # unman relationship
        r_0: Relationship = relationships[0]
        self.assertEqual("unman", r_0.title)
        self.assertEqual(1, r_0.weight)
        self.assertEqual(1, len(r_0.nodes))
        self.assertEqual("unman", r_0.nodes[0].word)

        r_1: Relationship = relationships[1]
        self.assertEqual(1, r_1.weight)
        self.assertEqual("plane", r_1.title)

        r_2: Relationship = relationships[2]
        self.assertEqual(0, r_2.weight)
        self.assertEqual("car", r_2.title)

        r_3: Relationship = relationships[3]
        self.assertEqual(0, r_3.weight)
        self.assertEqual("train", r_3.title)

        # Word Descriptors
        source_descriptors = explanation_with_roots.source_descriptors
        source_word = source_descriptors[0]
        self.assertEqual("unman", source_word.word)
        self.assertEqual(1, len(source_word.relationship_ids))
        self.assertEqual("unman", source_word.relationship_ids[0])

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
