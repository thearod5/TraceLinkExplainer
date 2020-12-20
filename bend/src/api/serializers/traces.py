"""
List of model serializers responsible for transforming data
between internal and external forms. The external form is
referenced as the fend model.
"""

from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.relations import PrimaryKeyRelatedField

import api.models as models


def create_trace_error(t_type: str, e_type: str, e_value: str):
    artifact_not_found = {
        "%s_%s" % (t_type, e_type): e_value
    }

    return {"trace %s artifact has undefined property:" % t_type: artifact_not_found}


class TraceSerializer(serializers.ModelSerializer):
    """
    Serializer for traces with contains vastly different internal and external models.
    Internal model specifies both artifact name and type for both source and target.
    External model specifies only the ids of source and target artifacts.
    """
    source = PrimaryKeyRelatedField(queryset=models.Artifact.objects.all())
    target = PrimaryKeyRelatedField(queryset=models.Artifact.objects.all())

    class Meta:
        """
        Specifies the internal model used by serializer and
        external fields that should be parsed.
        """
        model = models.Trace
        fields = ['source', 'target']

    def to_internal_value(self, data):
        """
        Given data containing artifact type and name for source and target artifacts,
        looks up each artifact and creates trace referencing both. Note,
        relies on the fact that artifacts already exist in persistent memory.
        """
        project_id = data.get('project')

        def validate_trace_artifact(t_type):
            """
            given type, source or target, validates and returns the artifact referenced
            errors on:
            - unknown artifact type
            - artifact with type and name not found inside project
            """

            def apply_filter(queryset, f_kwargs):
                """
                Iteratively applies key-value pairs in f_kwargs to queryset.filter, returning result.
                """
                filter_queryset = queryset
                for filter_key, filter_value in f_kwargs.items():
                    filter_item = {filter_key: filter_value}
                    filter_queryset = filter_queryset.filter(**filter_item)
                    if filter_queryset.count() == 0:
                        raise ValidationError(create_trace_error(t_type, filter_key, filter_value))
                return filter_queryset

            a_type, a_name = data.get("%s_type" % t_type), data.get("%s_name" % t_type)
            a_queryset = apply_filter(models.Artifact.objects,
                                      {'project_id': project_id, 'type': a_type, 'name': a_name})

            return a_queryset.first()

        source = validate_trace_artifact("source")
        target = validate_trace_artifact("target")

        return {
            "source": source,
            "target": target
        }
