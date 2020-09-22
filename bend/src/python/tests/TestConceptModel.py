import unittest

from conceptmodel.concept_model import get_concept_model_for_dataset, add_concept_families
from controllers.TraceExplanation import get_words_in_artifact
from models.TraceInformation import TraceExplanation, CHILD
from models.WordDescriptor import WordDescriptor


class TestConceptModel(unittest.TestCase):
    concept_model = get_concept_model_for_dataset("test")

    def runTest(self):
        self.test_ex_test_dataset()
        self.test_basic()
        self.test_empty()
        self.test_multiple_words()

    def test_ex_test_dataset(self):
        dataset = "test"
        source_words = get_words_in_artifact(dataset, "classes", "AFAssignRouteComponent.java")
        target_words = get_words_in_artifact(dataset, "designs", "DD-352")

        source_word_descriptors = list(map(WordDescriptor, source_words))
        target_word_descriptors = list(map(WordDescriptor, target_words))

        explanation = TraceExplanation(source_word_descriptors, target_word_descriptors)
        result = add_concept_families(dataset, explanation)
        relationships = result.relationships
        self.assertEqual(1, len(relationships))
        relationship = relationships[0]
        self.assertEqual("add->transmit", relationship.title)
        self.assertEqual(1, len(relationship.nodes))
        self.assertEqual(CHILD, relationship.nodes[0].node_type)

    def test_basic(self):
        word_1 = "micro uav"
        word_2 = ["micro air vehicle"]

        relationships = self.concept_model.get_word_relationships(word_1, word_2)
        relationship = relationships[0]
        self.assertTrue(word_1 in relationship.title)
        self.assertTrue(word_2[0] in relationship.title)
        self.assertEqual(relationship.nodes[0].word, "MAV")
        self.assertEqual(relationship.nodes[0].node_type, "synonym")

        self.assertEqual(relationship.nodes[1].word, "micro air vehicle")
        self.assertEqual(relationship.nodes[1].node_type, "synonym")

    def test_empty(self):
        word_1 = "micro uav"
        word_2 = ["something"]
        relationships = self.concept_model.get_word_relationships(word_1, word_2)
        self.assertEqual(len(relationships), 0)

    def test_multiple_words(self):
        word_1 = "micro uav"
        word_2 = ["car", "micro air vehicle"]

        relationships = self.concept_model.get_word_relationships(word_1, word_2)
        first_path = relationships[0]
        self.assertEqual(len(first_path.nodes), 3)
        self.assertEqual(first_path.nodes[0].word, "MAV")
        self.assertEqual(first_path.nodes[0].node_type, "synonym")

        self.assertEqual(first_path.nodes[1].word, "vehicle")
        self.assertEqual(first_path.nodes[1].node_type, "child")

        self.assertEqual(first_path.nodes[2].word, "car")
        self.assertEqual(first_path.nodes[2].node_type, "synonym")

        second_path = relationships[1]
        self.assertEqual(second_path.nodes[0].word, "MAV")
        self.assertEqual(second_path.nodes[0].node_type, "synonym")

        self.assertEqual(second_path.nodes[1].word, "micro air vehicle")
        self.assertEqual(second_path.nodes[1].node_type, "synonym")
