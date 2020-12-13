from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from api.views import get_explanation, search_artifacts, ProjectViewSet


class OptionalSlashRouter(routers.DefaultRouter):

    def __init__(self):
        super().__init__()
        self.trailing_slash = '/?'


router = OptionalSlashRouter()
router.register('projects', ProjectViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('projects/<str:project_name>/artifacts/', search_artifacts),
    path('<str:project_name>/traces/<str:source_name>/<str:target_name>', get_explanation),
    path('', include(router.urls))
]
