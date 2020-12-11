from django.db import models

MAX_ID_LENGTH = 50
MAX_BODY_LENGTH = 500


class DatasetMeta(models.Model):
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
    dataset = models.ForeignKey(DatasetMeta,
                                on_delete=models.CASCADE)
    type = models.ForeignKey(ArtifactType,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=MAX_ID_LENGTH)
    text = models.CharField(max_length=MAX_BODY_LENGTH)

    class Meta:
        unique_together = [['dataset', 'type', 'name']]
        ordering = ['dataset', 'type', 'name']


class Trace(models.Model):
    id = models.AutoField(primary_key=True)
    source = models.ForeignKey(Artifact,
                               on_delete=models.CASCADE,
                               related_name='source')
    target = models.ForeignKey(Artifact,
                               on_delete=models.CASCADE,
                               related_name='target')

    class Meta:
        unique_together = [['source', 'target']]
