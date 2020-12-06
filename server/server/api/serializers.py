from rest_framework import serializers

from api.models import Dataset, Artifact, Trace


class DatasetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dataset
        fields = ['name']


class ArtifactSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artifact
        fields = ['name', 'text', 'dataset']


class TraceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trace
        fields = ['source', 'target']
