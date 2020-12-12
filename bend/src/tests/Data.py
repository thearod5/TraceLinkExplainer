from functools import wraps

from api import models
from api.serializers import ArtifactSerializer, TraceSerializer, DatasetSerializer, create_object, ProjectSerializer


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
