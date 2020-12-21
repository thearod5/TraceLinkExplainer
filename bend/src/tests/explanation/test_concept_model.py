from django.test import TestCase

from api import models
from explanation.cleaners import get_words_in_string_doc
from explanation.conceptmodel.concept_model import ConceptModelFactory
from explanation.conceptmodel.concept_model_relationships import add_concept_families
from explanation.models.trace_information import TraceExplanation, CHILD, SYN, SOURCE
from explanation.models.word_descriptor import WordDescriptor
from tests.test_data import DataBuilder


def get_words_in_artifact(artifact_id: str):
    artifact = models.Artifact.objects.get(id=artifact_id)
    return get_words_in_string_doc(artifact.body)


class TestConceptModel(TestCase):
    dataset = "test"
    concept_model = ConceptModelFactory.get_model(dataset)

    def test_ex_test_dataset(self):
        data_builder = DataBuilder()
        project = data_builder.with_default_project(return_obj=True)

        source_words = get_words_in_artifact(data_builder.artifact_a_id)
        target_words = get_words_in_artifact(data_builder.artifact_b_id)

        source_word_descriptors = list(map(WordDescriptor, source_words))
        target_word_descriptors = list(map(WordDescriptor, target_words))

        explanation = TraceExplanation(source_word_descriptors, target_word_descriptors)
        result = add_concept_families(self.dataset, explanation)
        relationships = result.relationships
        self.assertEqual(1, len(relationships))

        relationship = relationships[0]

        self.assertEqual("transmit->add", relationship.title)
        self.assertEqual(2, len(relationship.nodes))
        self.assertEqual(SOURCE, relationship.nodes[0].node_type)
        self.assertEqual(CHILD, relationship.nodes[1].node_type)

        descriptor = list(filter(lambda r: r.word == "add", explanation.target_descriptors))[0]
        self.assertEqual("transmit->add", descriptor.relationship_ids[0])

    def test_basic(self):
        word_1 = "micro uav"
        word_2 = ["micro air vehicle"]

        relationships = self.concept_model.get_word_relationships(word_1, word_2)
        relationship = relationships[0]

        self.assertEqual(3, len(relationship.nodes))

        self.assertEqual("micro uav", relationship.nodes[0].word)
        self.assertEqual(SOURCE, relationship.nodes[0].node_type)

        self.assertEqual("MAV", relationship.nodes[1].word)
        self.assertEqual(SYN, relationship.nodes[1].node_type)

        self.assertEqual("micro air vehicle", relationship.nodes[2].word)
        self.assertEqual(SYN, relationship.nodes[2].node_type)

        self.assertTrue(word_1 in relationship.title)
        self.assertTrue(word_2[0] in relationship.title)

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
        self.assertEqual(len(first_path.nodes), 4)

        self.assertEqual(word_1, first_path.nodes[0].word)
        self.assertEqual(SOURCE, first_path.nodes[0].node_type)

        self.assertEqual("MAV", first_path.nodes[1].word)
        self.assertEqual(SYN, first_path.nodes[1].node_type)

        self.assertEqual("vehicle", first_path.nodes[2].word)
        self.assertEqual(CHILD, first_path.nodes[2].node_type)

        self.assertEqual(word_2[0], first_path.nodes[3].word)
        self.assertEqual(SYN, first_path.nodes[3].node_type)

        second_path = relationships[1]

        self.assertEqual(3, len(second_path.nodes))

        self.assertEqual(word_1, second_path.nodes[0].word)
        self.assertEqual(SOURCE, second_path.nodes[0].node_type)

        self.assertEqual("MAV", second_path.nodes[1].word)
        self.assertEqual(SYN, second_path.nodes[1].node_type)

        self.assertEqual(word_2[1], second_path.nodes[2].word)
        self.assertEqual(SYN, second_path.nodes[2].node_type)
