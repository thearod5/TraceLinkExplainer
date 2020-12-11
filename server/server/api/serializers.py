from typing import Type

from django.core.exceptions import ObjectDoesNotExist
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
        source = models.Artifact.objects.get(dataset=data.get('dataset'),
                                             type=data.get('source_type'),
                                             name=data.get('source_name'))
        target = models.Artifact.objects.get(dataset=data.get('dataset'),
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
        fields = ['dataset', 'type', 'name', 'text']


class NestedArtifactSerializer(ArtifactSerializer):
    class Meta:
        model = models.Artifact
        fields = ['type', 'name', 'text']


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DatasetMeta
        fields = ['name']


class ProjectSerializer(serializers.Serializer):

    def create(self, validated_data):
        dataset_data = validated_data.pop('dataset')
        artifact_data = validated_data.pop('artifacts')
        trace_data = validated_data.pop('traces')

        dataset = create_object(DatasetSerializer, dataset_data)

        artifacts = []
        for a_data in artifact_data:
            a_data.update({"dataset": dataset.id})
            artifact = create_object(ArtifactSerializer, a_data)
            artifacts.append(artifact)

        traces = []
        for t_data in trace_data:
            t_data.update({"dataset": dataset.id})
            trace = create_object(TraceSerializer, t_data)
            traces.append(trace)

        return dataset

    def to_internal_value(self, data):
        return data

    def to_representation(self, instance):
        artifacts = models.Artifact.objects.filter(dataset=instance.id)
        traces = models.Trace.objects.filter(source__dataset=instance.id, target__dataset=instance.id)
        a_serializer = ArtifactSerializer(artifacts, many=True)
        t_serializer = TraceSerializer(traces, many=True)
        return {
            "name": instance.name,
            "artifacts": a_serializer.data,
            "traces:": t_serializer.data
        }
