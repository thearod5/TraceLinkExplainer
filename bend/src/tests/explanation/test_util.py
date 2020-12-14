from django.test import TestCase

from explanation.models.TraceInformation import TraceExplanation
from explanation.models.WordDescriptor import WordDescriptor
from explanation.util.DictHelper import export_object_as_dict


class TestUtil(TestCase):

    def test_export_as_dict_with_obj_as_values(self):
        dict_with_obj_value = {"word": WordDescriptor("Word", ["family"])}
        result = export_object_as_dict(dict_with_obj_value)
        self.assertEqual("Word", result["word"]["word"])
        self.assertEqual("family", result["word"]["relationship_ids"][0])

    def test_export_as_dict(self):
        result = export_object_as_dict(
            TraceExplanation([WordDescriptor("WordOne", [])],
                             [WordDescriptor("WordTwo", [])]))
        self.assertEqual([], result["relationships"])
        self.assertEqual("WordOne", result["source_descriptors"][0]["word"])
        self.assertEqual([], result["source_descriptors"][0]["relationship_ids"])

        self.assertEqual("WordTwo", result["target_descriptors"][0]["word"])
        self.assertEqual([], result["target_descriptors"][0]["relationship_ids"])