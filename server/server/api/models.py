from django.db import models

MAX_ID_LENGTH = 50
MAX_BODY_LENGTH = 500


class Dataset(models.Model):
    name = models.CharField(max_length=MAX_ID_LENGTH)


class Artifact(models.Model):
    name = models.CharField(max_length=MAX_ID_LENGTH)
    text = models.CharField(max_length=MAX_BODY_LENGTH)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)


class Trace(models.Model):
    source = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name="source")
    target = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name="target")
