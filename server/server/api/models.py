from django.db import models

MAX_ID_LENGTH = 50
MAX_BODY_LENGTH = 500


class Dataset(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=MAX_ID_LENGTH)


class Artifact(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=MAX_ID_LENGTH)
    text = models.CharField(max_length=MAX_BODY_LENGTH)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)


class Trace(models.Model):
    id = models.AutoField(primary_key=True)
    source = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name="source")
    target = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name="target")

    class Meta:
        unique_together = [["source", "target"]]
