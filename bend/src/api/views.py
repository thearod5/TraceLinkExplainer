from django.db.models import Q
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.request import Request

import api.models as models
from api.serializers import ArtifactSerializer, ProjectDescriptionSerializer, ProjectSerializer
from explanation.TraceExplanation import get_trace_information
from search.Parsers import parse_definition


class ProjectViewSet(viewsets.ModelViewSet):
    """
    Responsible for interactions with projects, the following operations are defined:
    - get all project descriptions
    - create a project
    - delete project by id
    """
    queryset = models.ProjectDescription.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request, *args, **kwargs):
        projects = models.ProjectDescription.objects.all()
        p_serializer = ProjectDescriptionSerializer(projects, many=True)
        return JsonResponse(p_serializer.data, safe=False)


@api_view(['GET'])
def search_artifacts(request: Request, project_name: str):
    """
    Responsible for querying artifacts for a particular project
    Throws errors on:
    - project not found
    """
    project_artifacts = models.Artifact.objects.filter(project__name=project_name)
    if "source_name" in request.query_params:
        source_names = request.GET.getlist("source_name")
        print(source_names)
        filter_query = (Q(traces__source__name__in=source_names) | Q(traces__target__name__in=source_names))
        project_artifacts = models.Artifact.objects.filter(filter_query).exclude(name__in=source_names)

    if "query" in request.query_params:
        query = request.query_params['query']
        expr = parse_definition(query)
        if isinstance(expr, str):
            return models.ApplicationError("could not parse (%s) into expression" % expr)
        q = expr.eval()
        project_artifacts = project_artifacts.filter(q)

    payload = ArtifactSerializer(project_artifacts, many=True).data
    return JsonResponse(payload, safe=False)


@api_view(['GET'])
def get_explanation(request: Request, project_name: str, source_name: str, target_name: str):
    """
    Responsible for generating the trace explanation for two traced artifacts in a project.
    Throws errors on:
    - project not found
    - artifacts are not found
    - artifacts founds are not traced
    """
    trace_a = (Q(source__name=source_name) & Q(target__name=target_name))
    trace_b = (Q(source__name=target_name) & Q(target__name=source_name))
    trace_query = trace_a | trace_b
    if len(models.Trace.objects.filter(trace_query)) == 0:
        return models.ApplicationError("artifacts are not traced: %s - %s" % (source_name, target_name))
    explanation = get_trace_information(project_name=project_name,
                                        source_name=source_name,
                                        target_name=target_name)
    return JsonResponse(explanation)
