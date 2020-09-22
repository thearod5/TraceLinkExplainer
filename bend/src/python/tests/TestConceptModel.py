import unittest

from conceptmodel.concept_model import get_concept_model_for_dataset


class TestConceptModel(unittest.TestCase):
    def test_simple(self):
        word_1 = "national airspace system"
        word_2 = "detect and avoid"
        concept_model = get_concept_model_for_dataset("Drone")
        path = concept_model.get_path(word_1, word_2)
        print(path)
