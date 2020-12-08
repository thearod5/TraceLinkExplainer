from rest_framework import serializers

from api.models import Dataset, Artifact, Trace


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ['id', 'name']


class ArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artifact
        fields = ['id', 'name', 'text', 'dataset']


class TraceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trace
        fields = ['id', 'source', 'target']
