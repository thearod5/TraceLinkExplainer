from django.test import TestCase
from rest_framework.test import APIClient

from tests.Data import DataBuilder


class TestCreateProject(TestCase):
    def test_default(self):
        client = APIClient()
        project_data = DataBuilder().get_default_project_data()
        response = client.post('/projects', project_data, format='json')
        self.assertEqual(201, response.status_code)

    def malformed_trace_validation(self, t_type: str, attr_type):
        project_data = DataBuilder().get_default_project_data()
        client: APIClient = APIClient()
        non_existent_value = 'bubbaboosh'

        # inject non-existent value for attribute
        attribute_name = "%s_%s" % (t_type, attr_type)
        project_data['traces'][0][attribute_name] = non_existent_value

        project_data['artifacts'][0]["body"] = "hello"
        project_data['artifacts'][1]["body"] = "world"

        # request
        response = client.post('/projects', project_data, format='json')
        self.assertGreaterEqual(response.status_code, 400)
        self.assertIn(attr_type, str(response.content))

    def test_undefined_source_name(self):
        self.malformed_trace_validation("source", "name")

    def test_undefined_source_type(self):
        self.malformed_trace_validation("source", "type")

    def test_undefined_target_type(self):
        self.malformed_trace_validation("target", "type")

    def test_undefined_target_name(self):
        self.malformed_trace_validation("target", "name")
