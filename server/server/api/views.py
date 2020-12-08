import rest_framework.viewsets as viewsets
from rest_framework import status
from rest_framework.response import Response

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
    serializer_class = serializers.ArtifactSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = serializers.ArtifactSerializer(instance)
        return Response(serializer.data)


class TraceViewSet(viewsets.ModelViewSet):
    """
    Allows the creation, updating, and reading of datasets in the system.
    """
    queryset = models.Trace.objects.all().order_by('-source')
    serializer_class = serializers.TraceSerializer
