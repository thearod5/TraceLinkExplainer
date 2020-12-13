import json
import uuid
from typing import List

from django.db import models
from django.http import HttpResponseBadRequest

MAX_ID_LENGTH = 4096  # max path length on linux
MAX_BODY_LENGTH = 1000000


class ProjectDescription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=MAX_ID_LENGTH)
    description = models.CharField(max_length=MAX_BODY_LENGTH)

    class Meta:
        unique_together = ['name']
        ordering = ['name']


class ArtifactType(models.Model):
    name = models.CharField(max_length=MAX_ID_LENGTH, primary_key=True, unique=True)

    class Meta:
        ordering = ['name']


class Artifact(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(ProjectDescription,
                                on_delete=models.CASCADE)
    type = models.ForeignKey(ArtifactType,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=MAX_ID_LENGTH)
    body = models.CharField(max_length=MAX_BODY_LENGTH)
    traces = models.ManyToManyField("Trace")

    class Meta:
        unique_together = [['project', 'type', 'name']]
        ordering = ['project', 'type', 'name']


class Trace(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source = models.ForeignKey(Artifact,
                               on_delete=models.CASCADE,
                               related_name='source')
    target = models.ForeignKey(Artifact,
                               on_delete=models.CASCADE,
                               related_name='target')

    class Meta:
        unique_together = [['source', 'target']]


class Project:
    def __init__(self, meta, artifacts, traces):
        self.meta: ProjectDescription = meta
        self.artifacts: List[Artifact] = artifacts
        self.traces: List[Trace] = traces


class ApplicationError(HttpResponseBadRequest):
    def __init__(self, message: str):
        super().__init__(json.dumps({'details': message}), content_type='application/json')
