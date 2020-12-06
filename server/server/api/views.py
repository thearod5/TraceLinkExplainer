from rest_framework import viewsets

from api import serializers, models


class DatasetViewSet(viewsets.ModelViewSet):
    """
    Allows the creation, updating, and reading of datasets in the system.
    """
    queryset = models.Dataset.objects.all().order_by('-name')
    serializer_class = serializers.DatasetSerializer


class ArtifactViewSet(viewsets.ModelViewSet):
    """
    Allows the creation, updating, and reading of datasets in the system.
    """
    queryset = models.Artifact.objects.all().order_by('-name')
    serializer_class = serializers.DatasetSerializer


class TraceViewSet(viewsets.ModelViewSet):
    """
    Allows the creation, updating, and reading of datasets in the system.
    """
    queryset = models.Trace.objects.all().order_by('-source')
    serializer_class = serializers.TraceSerializer
