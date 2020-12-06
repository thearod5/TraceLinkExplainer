from django.db import models


# Create your models here.
class Trace:
    def __init__(self):
        source_artifact = models.CharField(max_length=50)
        target_artifact = models.CharField(max_length=50)
