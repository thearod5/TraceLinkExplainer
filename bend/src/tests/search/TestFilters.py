from django.test import TestCase

from api import models
from search.Attributes import NameAttribute
from search.Expressions import QueryExpression
from search.Filters import Filter, EqualFilter
from tests.Data import DataBuilder


class TestFilters(TestCase):
    def test_filter_equality(self):
        self.assertEqual(Filter("="), Filter("="))
        self.assertNotEqual(Filter("!="), Filter("="))
        self.assertIn(Filter("="), [EqualFilter()])

    def test_not_filter(self):
        data_builder = DataBuilder()
        data_builder.with_default_project()
        q = QueryExpression(NameAttribute(), Filter("!="), data_builder.artifact_a_name)
        artifacts = models.Artifact.objects.filter(q.eval())

        self.assertEqual(1, len(artifacts))
        self.assertEqual(data_builder.artifact_b_name, artifacts.first().name)
