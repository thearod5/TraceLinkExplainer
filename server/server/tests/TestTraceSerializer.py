from functools import wraps

from django.test import TestCase

import api.models as models
from api.serializers import ArtifactSerializer, TraceSerializer, DatasetSerializer, ProjectSerializer, create_object


def create_dataset(data):
    return create_object(DatasetSerializer, data)


def create_project(data) -> models.DatasetMeta:
    return create_object(ProjectSerializer, data)


def optional_builder_method(f):
    @wraps(f)
    def wrapper(*args, return_obj=False):
        object_created = f(*args)
        if return_obj:
            return object_created
        return args[0]  # assumed to be 'self'

    return wrapper


class DataBuilder:
    dataset_name = "Drone"

    artifact_a_type = "requirements"
    artifact_a_name = "RE-8"
    artifact_a_text = "hello world"

    dataset_id = None

    dataset = {
        "name": dataset_name
    }

    artifact_a = {
        "type": artifact_a_type,
        "name": artifact_a_name,
        "text": artifact_a_text
    }

    artifact_b_name = "RE-10"

    artifact_b = {
        "type": artifact_a_type,
        "name": artifact_b_name,
        "text": artifact_a_text
    }

    trace = {
        "source_type": artifact_a_type,
        "target_type": artifact_a_type,
        "source_name": artifact_a_name,
        "target_name": artifact_b_name
    }

    @optional_builder_method
    def create_empty_dataset(self):
        dataset = create_dataset(self.dataset)
        self.dataset_id = dataset.id
        return dataset

    @optional_builder_method
    def create_project(self):
        data = {
            "dataset": self.dataset,
            "artifacts": [self.artifact_a, self.artifact_b],
            "traces": [self.trace]}
        dataset = create_project(data)
        self.dataset_id = dataset.id
        return dataset

    def with_artifact(self, artifact_data):
        artifact_data = artifact_data.copy()
        artifact_data.update({"dataset": self.dataset_id})
        a_serializer = ArtifactSerializer(data=artifact_data, many=False)
        a_serializer.is_valid(raise_exception=True)
        return a_serializer.save()

    @optional_builder_method
    def with_artifact_a(self):
        return self.with_artifact(self.artifact_a)

    @optional_builder_method
    def with_artifact_b(self):
        return self.with_artifact(self.artifact_b)

    def with_artifacts(self):
        self.with_artifact_a()
        self.with_artifact_b()
        return self

    @optional_builder_method
    def with_trace(self):
        t_data = self.trace
        t_data.update({'dataset': self.dataset_id})
        t_serializer = TraceSerializer(data=t_data, many=False)
        t_serializer.is_valid(raise_exception=True)
        return t_serializer.save()


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
