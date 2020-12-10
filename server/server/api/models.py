from django.db import models

MAX_ID_LENGTH = 50
MAX_BODY_LENGTH = 500


class Dataset(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=MAX_ID_LENGTH)

    class Meta:
        unique_together = ['name']
        ordering = ['name']


class ArtifactType(models.Model):
    name = models.CharField(max_length=MAX_ID_LENGTH, primary_key=True, unique=True)

    class Meta:
        ordering = ['name']


class Artifact(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.ForeignKey(Dataset, related_name='artifacts', on_delete=models.CASCADE)
    type = models.ForeignKey(ArtifactType, related_name='type', on_delete=models.CASCADE)
    name = models.CharField(max_length=MAX_ID_LENGTH)
    text = models.CharField(max_length=MAX_BODY_LENGTH)

    class Meta:
        unique_together = [['dataset', 'type', 'name']]
        ordering = ['dataset', 'type', 'name']


class Trace(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.ForeignKey(Dataset, related_name='traces', on_delete=models.CASCADE)

    source_type = models.ForeignKey(ArtifactType, related_name='source_type', on_delete=models.CASCADE)
    source_name = models.ForeignKey(Artifact, related_name='source_name', on_delete=models.CASCADE)

    target_type = models.ForeignKey(ArtifactType, related_name='target_type', on_delete=models.CASCADE)
    target_name = models.ForeignKey(Artifact, related_name='target_name', on_delete=models.CASCADE)

    class Meta:
        unique_together = [['dataset', 'source_type', 'source_name', 'target_type', 'target_name']]
        ordering = ['dataset', 'source_name', 'target_name']
