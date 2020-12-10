from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import smart_text
from rest_framework import serializers

import api.models as models


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
    source_type = CreatableSlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.ArtifactType.objects.all()
    )

    source_name = CreatableSlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.Artifact.objects.all()
    )

    target_type = CreatableSlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.ArtifactType.objects.all()
    )

    target_name = CreatableSlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.Artifact.objects.all()
    )

    class Meta:
        model = models.Trace
        fields = ['source_type', 'source_name', 'target_type', 'target_name']


class ArtifactSerializer(serializers.ModelSerializer):
    type = CreatableSlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.ArtifactType.objects.all()
    )

    class Meta:
        model = models.Artifact
        fields = ['type', 'name', 'text']


class DatasetSerializer(serializers.ModelSerializer):
    artifacts = ArtifactSerializer(many=True)
    traces = TraceSerializer(many=True)

    class Meta:
        model = models.Dataset
        fields = ['name', 'artifacts', 'traces']

    def create(self, validated_data):
        artifacts_data = validated_data.pop('artifacts')
        traces_data = validated_data.pop('traces')
        dataset = models.Dataset.objects.create(**validated_data)

        for artifact_data in artifacts_data:
            models.Artifact.objects.create(dataset=dataset, **artifact_data)

        return dataset
