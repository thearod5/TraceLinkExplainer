from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import smart_text
from rest_framework import serializers
from rest_framework.relations import SlugRelatedField

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

    target_type = CreatableSlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.ArtifactType.objects.all()
    )

    dataset = SlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.Dataset.objects.all()
    )

    class Meta:
        model = models.Trace
        fields = ['dataset', 'source_type', 'source_name', 'target_type', 'target_name']


class ArtifactSerializer(serializers.ModelSerializer):
    type = CreatableSlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.ArtifactType.objects.all()
    )

    dataset = SlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.Dataset.objects.all()
    )

    class Meta:
        model = models.Artifact
        fields = ['dataset', 'type', 'name', 'text']


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Dataset
        fields = ['name']
