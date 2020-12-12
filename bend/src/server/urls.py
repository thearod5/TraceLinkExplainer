from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from api import views
from api.views import get_explanation, search_artifacts


class OptionalSlashRouter(routers.DefaultRouter):

    def __init__(self):
        super().__init__()
        self.trailing_slash = '/?'


router = OptionalSlashRouter()
router.register(r'projects', views.ProjectViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('projects/<str:dataset_name>/artifacts/', search_artifacts),
    path('<str:dataset_name>/traces/<str:source_name>/<str:target_name>', get_explanation),
    path('', include(router.urls))
]
