import json
from functools import wraps
from typing import List

from django.db.models import Q
from django.http import HttpResponseBadRequest, JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.request import Request

from api import models
from api.serializers import ProjectSerializer, ArtifactSerializer, ProjectMetaSerializer
from explanation.controllers.TraceExplanation import get_trace_information


class ApplicationError(HttpResponseBadRequest):
    def __init__(self, message: str):
        super().__init__(json.dumps({'details': message}), content_type='application/json')


def has_params(request: Request, params: List[str]):
    return all([param in request.query_params for param in params])


def require_query_params(required_params):
    """
    request handler decorator that verifies that request contains given query params
    """

    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwds):
            print(args)
            if not has_params(args[1], required_params):
                return ApplicationError("missing one of required params: %s" % required_params)
            return f(*args, **kwds)

        return wrapper

    return decorator


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = models.ProjectMeta.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request, *args, **kwargs):
        projects = models.ProjectMeta.objects.all()
        p_serializer = ProjectMetaSerializer(projects, many=True)
        return JsonResponse(p_serializer.data, safe=False)


@api_view(['GET'])
def search_artifacts(request: Request, project_name: str):
    project_artifacts = models.Artifact.objects.filter(project__name=project_name)
    if "source_name" in request.query_params:
        source_names = request.GET.getlist("source_name")
        filter_query = (Q(traces__source__name__in=source_names) | Q(traces__target__name__in=source_names))
        project_artifacts = models.Artifact.objects.filter(filter_query).exclude(name__in=source_names)

    payload = ArtifactSerializer(project_artifacts, many=True).data
    return JsonResponse(payload, safe=False)


@api_view(['GET'])
def get_explanation(request: Request, project_name: str, source_name: str, target_name: str):
    trace_a = (Q(source__name=source_name) & Q(target__name=target_name))
    trace_b = (Q(source__name=target_name) & Q(target__name=source_name))
    trace_query = trace_a | trace_b
    if len(models.Trace.objects.filter(trace_query)) == 0:
        return ApplicationError("artifacts are not traced: %s - %s" % (source_name, target_name))
    explanation = get_trace_information(project_name=project_name,
                                        source_name=source_name,
                                        target_name=target_name)
    return JsonResponse(explanation)
