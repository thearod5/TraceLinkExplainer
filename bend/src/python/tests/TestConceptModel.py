import unittest

from conceptmodel.concept_model import get_concept_model_for_dataset


class TestConceptModel(unittest.TestCase):
    concept_model = get_concept_model_for_dataset("test")

    def test_simple(self):
        word_1 = "micro uav"
        word_2 = ["micro air vehicle"]

        relationship = self.concept_model.get_word_relationships(word_1, word_2)
        result = relationship[0]
        self.assertEqual(result[0].word, "MAV")
        self.assertEqual(result[0].relationship, "synonym")

        self.assertEqual(result[1].word, "micro air vehicle")
        self.assertEqual(result[1].relationship, "synonym")

    def test_empty(self):
        word_1 = "micro uav"
        word_2 = ["something"]
        result = self.concept_model.get_word_relationships(word_1, word_2)
        self.assertEqual(len(result), 1)
        self.assertEqual(len(result[0]), 0)

    def test_multiple_words(self):
        word_1 = "micro uav"
        word_2 = ["car", "micro air vehicle"]

        relationships = self.concept_model.get_word_relationships(word_1, word_2)
        first_path = relationships[0]
        self.assertEqual(len(first_path), 3)
        self.assertEqual(first_path[0].word, "MAV")
        self.assertEqual(first_path[0].relationship, "synonym")

        self.assertEqual(first_path[1].word, "vehicle")
        self.assertEqual(first_path[1].relationship, "child")

        self.assertEqual(first_path[2].word, "car")
        self.assertEqual(first_path[2].relationship, "synonym")

        second_path = relationships[1]
        self.assertEqual(second_path[0].word, "MAV")
        self.assertEqual(second_path[0].relationship, "synonym")

        self.assertEqual(second_path[1].word, "micro air vehicle")
        self.assertEqual(second_path[1].relationship, "synonym")
