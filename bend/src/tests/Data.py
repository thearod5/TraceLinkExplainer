import json
import os
from functools import wraps

from api import models
from api.serializers import ArtifactSerializer, TraceSerializer, ProjectMetaSerializer, create_object, ProjectSerializer
from explanation.Paths import PATH_TO_TEST_PROJECT_RESOURCES


def read_json_file(path_to_file):
    with open(path_to_file) as f:
        data = json.load(f)
    return data


def create_test_file_path(name):
    return os.path.join(PATH_TO_TEST_PROJECT_RESOURCES, name + ".json")


def get_test_file(name):
    return read_json_file(create_test_file_path(name))


def create_project_meta(data) -> models.ProjectMeta:
    return create_object(ProjectMetaSerializer, data)


def create_project(data) -> models.ProjectMeta:
    return create_object(ProjectSerializer, data)


def builder_method(f):
    @wraps(f)
    def wrapper(*args, return_obj=False):
        object_created = f(*args)
        if return_obj:
            return object_created
        return args[0]  # assumed to be 'self'

    return wrapper


class DataBuilder:
    project_id = None

    project_meta = get_test_file('meta')
    project_name = project_meta['name']

    artifact_a = get_test_file('artifact_a')
    artifact_a_id = None
    artifact_a_type = artifact_a['type']
    artifact_a_name = artifact_a['name']
    artifact_a_body = artifact_a['body']

    artifact_b = get_test_file('artifact_b')
    artifact_b_id = None
    artifact_b_name = artifact_b['name']
    artifact_b_type = artifact_b['type']
    artifact_b_body = artifact_b['body']

    n_artifact_types = len({artifact_a_type, artifact_b_type})

    trace = {
        "source_type": artifact_a_type,
        "source_name": artifact_a_name,
        "target_type": artifact_b_type,
        "target_name": artifact_b_name
    }

    def set_artifact_ids(self):
        self.artifact_a_id = models.Artifact.objects.get(name=self.artifact_a_name).id
        self.artifact_b_id = models.Artifact.objects.get(name=self.artifact_b_name).id

    @builder_method
    def with_empty_project(self):
        data = {
            "project": self.project_meta,
            "artifacts": [],
            "traces": []}
        meta = create_project(data)
        self.project_id = meta.id
        return meta

    def get_default_project_data(self):
        artifacts = [self.artifact_a, self.artifact_b]
        traces = [self.trace]
        data = {
            "project": self.project_meta,
            "artifacts": artifacts,
            "traces": traces
        }
        return data

    @builder_method
    def with_default_project(self):
        data = self.get_default_project_data()
        meta = create_project(data)
        self.set_artifact_ids()
        self.project_id = meta.id
        return meta

    def _with_artifact(self, artifact_data):
        artifact_data = artifact_data.copy()
        artifact_data.update({"project": self.project_id})
        a_serializer = ArtifactSerializer(data=artifact_data, many=False)
        a_serializer.is_valid(raise_exception=True)
        return a_serializer.save()

    @builder_method
    def with_artifact_a(self):
        return self._with_artifact(self.artifact_a)

    @builder_method
    def with_artifact_b(self):
        return self._with_artifact(self.artifact_b)

    @builder_method
    def with_artifacts(self):
        a = self.with_artifact_a()
        b = self.with_artifact_b()
        return a, b

    @builder_method
    def with_trace(self):
        t_data = self.trace
        t_data.update({'project': self.project_id})
        t_serializer = TraceSerializer(data=t_data, many=False)
        t_serializer.is_valid(raise_exception=True)
        return t_serializer.save()
