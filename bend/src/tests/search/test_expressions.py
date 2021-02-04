from django.test import TestCase

from api import models
from search.Combinators import AndCombinator, Combinator
from search.attributes import NameAttribute, TypeAttribute
from search.expressions import QueryExpression
from search.filters import Filter, EqualFilter
from tests.test_data import DataBuilder


class TestExpressions(TestCase):
    def test_query_expression_construction(self):
        data_builder = DataBuilder()
        data_builder.with_default_project()
        q = QueryExpression(NameAttribute(), Filter("="), data_builder.artifact_a_name)
        artifacts = models.Artifact.objects.filter(q.eval())

        self.assertEqual(1, len(artifacts))
        self.assertEqual(data_builder.artifact_a_name, artifacts.first().name)

    def test_combinator_construction(self):
        data_builder = DataBuilder()
        data_builder.with_default_project()
        q1 = QueryExpression(NameAttribute(), Filter("="), data_builder.artifact_a_name)
        q2 = QueryExpression(TypeAttribute(), Filter("!="), data_builder.artifact_b_type)
        q = AndCombinator(q1, q2)
        artifacts = models.Artifact.objects.filter(q.eval())

        self.assertEqual(1, len(artifacts))
        self.assertEqual(data_builder.artifact_a_name, artifacts.first().name)

    def test_combinator_empty_query(self):
        data_builder = DataBuilder()
        data_builder.with_default_project()
        q1 = QueryExpression(NameAttribute(), Filter("="), data_builder.artifact_a_name)
        q2 = QueryExpression(TypeAttribute(), Filter("!="), data_builder.artifact_a_type)
        q = AndCombinator(q1, q2)
        artifacts = models.Artifact.objects.filter(q.eval())

        self.assertEqual(0, len(artifacts))

    def test_combinator_equality(self):
        def get_parts():
            left = QueryExpression(NameAttribute(), EqualFilter(), "RE-8")
            right = QueryExpression(TypeAttribute(), EqualFilter(), "requirements"),

            return left, right

        def create_combinator():
            left, right = get_parts()
            return AndCombinator(left, right)

        left, right = get_parts()
        self.assertEqual(create_combinator(), create_combinator())
        self.assertEqual(create_combinator(), Combinator("^^", left, right))
