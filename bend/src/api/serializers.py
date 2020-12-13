from typing import Type, TypedDict

from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.utils.encoding import smart_text
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import Serializer

import api.models as models


def create_object(serializer_class: Type[Serializer], data):
    serializer = serializer_class(data=data, many=False)
    serializer.is_valid(raise_exception=True)
    return serializer.save()


class CreatableSlugRelatedField(serializers.SlugRelatedField):
    """
    A SlugRelatedField that will create object if it does not exist.
    """

    def to_internal_value(self, data):
        try:
            return self.get_queryset().get_or_create(**{self.slug_field: data})[0]
        except ObjectDoesNotExist:
            self.fail('does_not_exist', slug_name=self.slug_field, value=smart_text(data))
        except (TypeError, ValueError):
            self.fail('invalid')


class TraceSerializer(serializers.ModelSerializer):
    source = PrimaryKeyRelatedField(queryset=models.Artifact.objects.all())
    target = PrimaryKeyRelatedField(queryset=models.Artifact.objects.all())

    class Meta:
        model = models.Trace
        fields = ['source', 'target']

    def to_internal_value(self, data):
        source = models.Artifact.objects.get(project=data.get('project'),
                                             type=data.get('source_type'),
                                             name=data.get('source_name'))
        target = models.Artifact.objects.get(project=data.get('project'),
                                             type=data.get('target_type'),
                                             name=data.get('target_name'))

        return {
            "source": source,
            "target": target
        }


class ArtifactSerializer(serializers.ModelSerializer):
    type = CreatableSlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.ArtifactType.objects.all()
    )

    class Meta:
        model = models.Artifact
        fields = ['id', 'project', 'type', 'name', 'body']


class NestedArtifactSerializer(ArtifactSerializer):
    class Meta:
        model = models.Artifact
        fields = ['id', 'type', 'name', 'body']


class ProjectMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectMeta
        fields = '__all__'


def get_project_from_meta(meta: models.ProjectMeta):
    artifacts = models.Artifact.objects.filter(project__id=meta.id)
    traces = models.Trace.objects.filter(source__project=meta.meta.id, target__project=meta.meta.id)
    artifacts = NestedArtifactSerializer(artifacts, many=True).data  # ignores project_meta id from objects
    traces = TraceSerializer(traces, many=True).data

    return models.Project(meta, artifacts, traces)


class ProjectSerializer(serializers.Serializer):

    @transaction.atomic
    def create(self, validated_data) -> models.Project:
        meta_data = validated_data.pop('project')
        artifact_data = validated_data.pop('artifacts')
        trace_data = validated_data.pop('traces')

        project_meta = create_object(ProjectMetaSerializer, meta_data)

        artifact_id_map: TypedDict[str, models.Artifact] = {}
        artifacts = []
        for a_data in artifact_data:
            a_data.update({"project": project_meta.id})
            artifact = create_object(ArtifactSerializer, a_data)
            artifact_id_map[artifact.id] = artifact
            artifacts.append(artifact)

        artifact_traces = {}
        traces = []
        for t_data in trace_data:
            t_data.update({"project": project_meta.id})
            trace = create_object(TraceSerializer, t_data)
            traces.append(traces)

            # map traces to their source and target artifacts
            if trace.source_id not in artifact_traces:
                artifact_traces[trace.source_id] = [trace]
            else:
                artifact_traces[trace.source_id] = artifact_traces[trace.source_id] + [trace]

            if trace.target_id not in artifact_traces:
                artifact_traces[trace.target_id] = [trace]
            else:
                artifact_traces[trace.target_id] = artifact_traces[trace.target_id] + [trace]

        # update many to many entries between artifacts and traces
        for artifact_id, traces in artifact_traces.items():
            artifact = artifact_id_map[artifact_id]
            for trace in traces:
                artifact.traces.add(trace)
            artifact.save()

        return project_meta

    def update(self, instance, validated_data):
        raise NotImplementedError("updating projects on this route is not defined.")

    def to_internal_value(self, data):
        return data

    def to_representation(self, instance: models.ProjectMeta):
        artifacts = models.Artifact.objects.filter(project__id=instance.id)
        traces = models.Trace.objects.filter(source__project=instance.id, target__project=instance.id)
        artifacts = NestedArtifactSerializer(artifacts, many=True).data  # ignores project_meta id from objects
        traces = TraceSerializer(traces, many=True).data

        return {
            "id": instance.id,
            "name": instance.name,
            "artifacts": artifacts,
            "traces:": traces
        }
