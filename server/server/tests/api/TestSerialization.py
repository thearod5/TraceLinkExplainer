from django.test import TestCase

import api.models as models
from tests.Data import DataBuilder


class TestTraceSerializer(TestCase):

    def test_create_empty_dataset(self):
        data = DataBuilder()
        dataset = data.create_empty_dataset(return_obj=True)
        self.assertIsNotNone(dataset)
        self.assertEqual(data.dataset_name, dataset.name)
        self.assertEqual(1, len(models.DatasetMeta.objects.all()))
        self.assertEqual(0, len(models.Artifact.objects.all()))

    def test_artifact_serializer(self):
        data = DataBuilder()
        artifact = data.create_empty_dataset().with_artifact_a(return_obj=True)
        self.assertEqual(data.dataset_name, artifact.dataset.name)
        self.assertEqual(data.artifact_a_type, artifact.type.name)
        self.assertEqual(data.artifact_a_name, artifact.name)
        self.assertEqual(data.artifact_a_text, artifact.text)
        self.assertEqual(1, len(models.Artifact.objects.all()))

    def test_cannot_create_artifact_duplicates(self):
        data = DataBuilder()
        self.assertRaises(Exception, lambda: data.create_empty_dataset().with_artifact_a().with_artifact_a())

    def test_trace_serializer(self):
        data = DataBuilder()
        trace = data.create_empty_dataset().with_artifacts().with_trace(return_obj=True)
        self.assertEqual(1, len(models.DatasetMeta.objects.all()))
        self.assertEqual(2, len(models.Artifact.objects.all()))
        self.assertEqual(1, len(models.Trace.objects.all()))
        self.assertEqual(1, len(models.ArtifactType.objects.all()))

        self.assertEqual(data.artifact_a_type, trace.source.type.name)
        self.assertEqual(data.artifact_a_name, trace.source.name)
        self.assertEqual(data.artifact_a_type, trace.target.type.name)
        self.assertEqual(data.artifact_b_name, trace.target.name)

    def test_integration(self):
        data = DataBuilder()
        dataset = data.create_project(return_obj=True)
        self.assertEqual(data.dataset_id, dataset.id)

        self.assertEqual(2, len(models.Artifact.objects.all()))
        self.assertEqual(1, len(models.Trace.objects.all()))

        print(models.Artifact.objects.filter(traces__source__name="RE-8", name="RE-8"))
