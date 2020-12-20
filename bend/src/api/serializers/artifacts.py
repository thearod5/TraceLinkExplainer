from abc import ABC

from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import smart_text
from rest_framework import serializers

from api import models as models


class CreatableSlugRelatedField(serializers.SlugRelatedField, ABC):
    """
    An AbstractClass wrapping fields that need to exist in the database upon loading.
    If they already exist, the value is returned. Otherwise, it is created and returned.
    """

    def to_internal_value(self, data):
        """
        Checks if given data exists in implemented queryset. Otherwise, creates and returns it.
        """
        try:
            return self.get_queryset().get_or_create(**{self.slug_field: data})[0]
        except ObjectDoesNotExist:
            self.fail('does_not_exist', slug_name=self.slug_field, value=smart_text(data))
        except (TypeError, ValueError):
            self.fail('invalid')


class ArtifactSerializer(serializers.ModelSerializer):
    """
    Specifies that fields that django should automatically parse based on
    field types.
    """
    type = CreatableSlugRelatedField(
        many=False,
        slug_field='name',
        queryset=models.ArtifactType.objects.all()
    )

    class Meta:
        """
        Meta class specifies to django what fields should be parsed on the target model
        """
        model = models.Artifact
        fields = ['id', 'project', 'type', 'name', 'body']
