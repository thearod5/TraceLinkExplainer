from django.test import TestCase

from api.models import Dataset, Artifact, Trace
from api.serializers import DatasetSerializer, ArtifactSerializer, TraceSerializer


class DataBuilder:
    dataset_name = "Drone"

    artifact_a_type = "requirements"
    artifact_a_name = "RE-8"
    artifact_a_text = "hello world"

    empty_dataset = {
        "name": dataset_name
    }

    artifact_a = {
        "dataset": dataset_name,
        "type": artifact_a_type,
        "name": artifact_a_name,
        "text": artifact_a_text
    }

    artifact_b_name = "RE-10"

    artifact_b = {
        "dataset": dataset_name,
        "type": artifact_a_type,
        "name": artifact_b_name,
        "text": artifact_a_text
    }

    trace = {
        "dataset": dataset_name,
        "source_type": artifact_a_type,
        "target_type": artifact_a_type,
        "source_name": artifact_a_name,
        "target_name": artifact_b_name
    }

    def create_empty_dataset(self):
        d_serializer = DatasetSerializer(data=self.empty_dataset, many=False)
        d_serializer.is_valid(raise_exception=True)
        Dataset.objects.create(**d_serializer.validated_data)
        return self

    def with_artifact(self, artifact_data, return_a):
        a_serializer = ArtifactSerializer(data=artifact_data, many=False)
        a_serializer.is_valid(raise_exception=True)
        artifact = Artifact.objects.create(**a_serializer.validated_data)
        if return_a:
            return artifact
        else:
            return self

    def with_artifact_a(self, return_a=False):
        return self.with_artifact(self.artifact_a, return_a)

    def with_artifact_b(self, return_a=False):
        return self.with_artifact(self.artifact_b, return_a)

    def with_artifacts(self):
        self.with_artifact_a()
        self.with_artifact_b()
        return self

    def with_trace(self, return_t=False):
        t_serializer = TraceSerializer(data=self.trace, many=False)
        t_serializer.is_valid(raise_exception=True)

        trace = Trace(**t_serializer.validated_data)
        if return_t:
            return trace
        else:
            return self


class TestTraceSerializer(TestCase):

    def test_create_empty_dataset(self):
        data = DataBuilder()
        data.create_empty_dataset()
        dataset = Dataset.objects.get(name=data.dataset_name)
        self.assertIsNotNone(dataset)
        self.assertEqual(data.dataset_name, dataset.name)

    def test_artifact_serializer(self):
        data = DataBuilder()
        artifact = data.create_empty_dataset().with_artifact_a(return_a=True)
        self.assertEqual(data.dataset_name, artifact.dataset.name)
        self.assertEqual(data.artifact_a_type, artifact.type.name)
        self.assertEqual(data.artifact_a_name, artifact.name)
        self.assertEqual(data.artifact_a_text, artifact.text)

    def test_cannot_create_artifact_duplicates(self):
        data = DataBuilder()
        data.create_empty_dataset()
        self.assertRaises(Exception, lambda: data.create_empty_dataset().with_artifact_a().with_artifact_a())

    def test_trace_serializer(self):
        data = DataBuilder()
        trace = data.create_empty_dataset().with_artifacts().with_trace(return_t=True)
        self.assertEqual(data.dataset_name, trace.dataset.name)

        self.assertEqual(data.artifact_a_name, trace.source_name)
        self.assertEqual(data.artifact_a_type, trace.source_type.name)

        self.assertEqual(data.artifact_b_name, trace.target_name)
        self.assertEqual(data.artifact_a_type, trace.target_type.name)
