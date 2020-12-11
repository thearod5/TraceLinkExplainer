import json
from functools import wraps
from typing import List

from django.http import HttpResponse, HttpResponseBadRequest
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.views import APIView

from api.models import DatasetMeta
from api.serializers import ProjectSerializer


class ApplicationError(HttpResponseBadRequest):
    def __init__(self, message: str):
        super().__init__(json.dumps({'details': message}), content_type='application/json')


def require_query_params(required_params):
    """
    request handler decorator that verifies that request contains given query params
    """

    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwds):
            if not has_params(args[1], required_params):
                return ApplicationError("missing one of required params: %s" % required_params)
            return f(*args, **kwds)

        return wrapper

    return decorator


class ProjectViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    queryset = DatasetMeta.objects.all()  # dummy query set
    serializer_class = ProjectSerializer


@require_query_params(["source", "target", "dataset"])
def get_explanation(self, request: Request, dataset: str, format=None):
    source_name = request.query_params.get("source")
    target_name = request.query_params.get("target")
    dataset_name = request.query_params.get("dataset")
    return HttpResponse("hello")


class SearchViewSet(APIView):
    @require_query_params(["query"])
    def get(self, request: Request, dataset: str, format=None):
        query_string = request.query_params.get("query")
        print("SEARCH PARAMS:", query_string, dataset)
        return HttpResponse("hello")


def has_params(request: Request, params: List[str]):
    return all([param in request.query_params for param in params])
