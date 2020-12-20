"""
List of registered applications running on django.
"""
from django.apps import AppConfig


class ApiConfig(AppConfig):
    """
    The api for TraceLinkExplainer.
    """
    name = 'api'
