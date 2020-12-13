import json

from django.test import TestCase
from rest_framework.test import APIClient

from api import models
from tests.Data import DataBuilder


class TestRoutes(TestCase):
    def test_get_projects(self):
        DataBuilder().with_default_project()
        response = self.client.get('/projects')
        projects = json.loads(response.content)
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(projects))

    def test_create_project(self):
        client = APIClient()
        project_data = DataBuilder().get_default_project_data()
        response = client.post('/projects', project_data, format='json')
        self.assertEqual(201, response.status_code, response.content)

    def test_delete_project_by_id(self):
        client = APIClient()
        meta: models.ProjectMeta = DataBuilder().with_default_project(return_obj=True)
        response = client.delete('/projects/' + meta.id.__str__())
        self.assertEqual(204, response.status_code, response.content)
