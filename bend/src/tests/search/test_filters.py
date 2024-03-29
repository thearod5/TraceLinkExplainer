from django.test import TestCase

from api import models
from search.attributes import NameAttribute, BodyAttribute
from search.expressions import QueryExpression
from search.filters import Filter, EqualFilter
from tests.test_data import DataBuilder


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

    def test_contains_filter(self):
        data_builder = DataBuilder()
        data_builder.with_default_project()
        expr = QueryExpression(BodyAttribute(), Filter("~"), "new route assignments")
        artifacts = models.Artifact.objects.filter(expr.eval())

        self.assertEqual(1, len(artifacts))
        self.assertEqual(data_builder.artifact_a_name, artifacts.first().name)
