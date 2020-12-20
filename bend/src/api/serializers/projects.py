"""
Serializer module for parsing project creation payloads and creating corresponding entities

A Project Payload requires:
{
  "project": {
    "name": str
    "description": str
  },
  "artifacts": [
    {
      "type": StrEnum
      "name": str
      "body": str
    } ...
  ],
  "traces": [
    {
      "source_type": StrEnum
      "source_name": str
      "target_type": str
      "target_name": str
    }
  ]
}
"""

from typing import TypedDict, Type

from django.db import transaction
from rest_framework import serializers
from rest_framework.serializers import Serializer

import api.models as models
from api.serializers.artifacts import ArtifactSerializer
from api.serializers.traces import TraceSerializer


def create_object(serializer_class: Type[Serializer], data):
    serializer = serializer_class(data=data, many=False)
    serializer.is_valid(raise_exception=True)
    return serializer.save()


class NestedArtifactSerializer(ArtifactSerializer):
    """
    Serializes artifact payloads received during full project creation.
    Differs from regular artifact serializer by skipping the project id
    field, which is specified outside of the artifact's definitions.
    """

    class Meta:
        """
        Overrides artifact serializer meta class to skip parsing project field
        """
        model = models.Artifact
        fields = ['id', 'type', 'name', 'body']


class ProjectSerializer(serializers.Serializer):
    """
    Class used to parse complete project creation payloads into
    the specified entities.
    """

    def create(self, validated_data) -> models.Project:
        with transaction.atomic():  # Outer atomic, start a new transaction
            with transaction.atomic():  # Inner atomic block, create a savepoint
                meta_data = validated_data.pop('project')
                artifact_data = validated_data.pop('artifacts')
                trace_data = validated_data.pop('traces')

                project_meta = create_object(ProjectDescriptionSerializer, meta_data)

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

    def to_representation(self, instance: models.ProjectDescription):
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


class ProjectDescriptionSerializer(serializers.ModelSerializer):
    """
    Parses and serializes project descriptions using django built in model serializer.
    """

    class Meta:
        """
        Specifies model ProjectDescription as the target class for serializing its fields
        """
        model = models.ProjectDescription
        fields = '__all__'
