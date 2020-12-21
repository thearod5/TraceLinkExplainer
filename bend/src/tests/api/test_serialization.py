from django.test import TestCase

import api.models as models
from tests.test_data import DataBuilder


class TestTraceSerializer(TestCase):

    def test_create_empty_dataset(self):
        data_builder = DataBuilder()
        meta = data_builder.with_empty_project(return_obj=True)
        self.assertIsNotNone(meta)
        self.assertEqual(data_builder.project_name, meta.name)
        self.assertEqual(1, len(models.ProjectDescription.objects.all()))
        self.assertEqual(0, len(models.Artifact.objects.all()))

    def test_artifact_serializer(self):
        data = DataBuilder()
        artifact = data.with_empty_project().with_artifact_a(return_obj=True)
        self.assertEqual(data.project_name, artifact.project.name)
        self.assertEqual(data.artifact_a_type, artifact.type.name)
        self.assertEqual(data.artifact_a_name, artifact.name)
        self.assertEqual(data.artifact_a_body, artifact.body)
        self.assertEqual(1, len(models.Artifact.objects.all()))

    def test_cannot_create_artifact_duplicates(self):
        data = DataBuilder()
        self.assertRaises(Exception, lambda: data.with_empty_project().with_artifact_a().with_artifact_a())

    def test_trace_serializer(self):
        data_builder = DataBuilder()
        trace = data_builder.with_empty_project().with_artifacts().with_trace(return_obj=True)
        self.assertEqual(1, len(models.ProjectDescription.objects.all()))
        self.assertEqual(2, len(models.Artifact.objects.all()))
        self.assertEqual(1, len(models.Trace.objects.all()))
        self.assertEqual(data_builder.n_artifact_types, len(models.ArtifactType.objects.all()))

        self.assertEqual(data_builder.artifact_a_type, trace.source.type.name)
        self.assertEqual(data_builder.artifact_a_name, trace.source.name)
        self.assertEqual(data_builder.artifact_b_type, trace.target.type.name)
        self.assertEqual(data_builder.artifact_b_name, trace.target.name)

    def test_integration(self):
        data = DataBuilder()
        meta = data.with_default_project(return_obj=True)
        self.assertEqual(data.project_id, meta.id)

        self.assertEqual(2, len(models.Artifact.objects.all()))
        self.assertEqual(1, len(models.Trace.objects.all()))
