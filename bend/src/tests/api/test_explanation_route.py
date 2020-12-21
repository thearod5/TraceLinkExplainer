import json

from django.test import TestCase

from tests.test_data import DataBuilder


class TestExplanationRoutes(TestCase):
    def test_get_projects(self):
        data_builder = DataBuilder()
        data_builder.with_default_project()

        url = "/Drone/traces/%s/%s" % (data_builder.artifact_a_name,
                                       data_builder.artifact_b_name)
        response = self.client.get(url, format='json')
        self.assertEqual(200, response.status_code)
        content = json.loads(response.content)
        self.assertGreater(len(content['sourceDescriptors']), 20)
        self.assertGreater(len(content['targetDescriptors']), 20)
