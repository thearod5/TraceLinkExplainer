from django.test import TestCase

from search.Attributes import NameAttribute, TypeAttribute
from search.Combinators import AndCombinator, OrCombinator, get_combinator_symbols
from search.Expressions import QueryExpression
from search.Filters import EqualFilter
from search.ParserUtil import get_symbols_in_def
from search.Parsers import parse_definition


class TestParse(TestCase):
    def test_parse_value(self):
        expr = parse_definition("4")
        self.assertEqual("4", expr)

    def test_filtered_expression(self):
        expr = parse_definition("name=RE-8")
        self.assertEqual(QueryExpression(NameAttribute(), EqualFilter(), "RE-8"), expr)

    def test_combinator(self):
        expr = parse_definition("name=RE-8&&type=requirements")
        left = QueryExpression(NameAttribute(), EqualFilter(), "RE-8")
        right = QueryExpression(TypeAttribute(), EqualFilter(), "requirements")
        expected = AndCombinator(left, right)
        self.assertEqual(expected, expr)

    def test_combinator_many(self):
        expr = parse_definition("name=RE-8&&type=requirements||name=RE-10")
        left = QueryExpression(NameAttribute(), EqualFilter(), "RE-8")
        right_left = QueryExpression(TypeAttribute(), EqualFilter(), "requirements")
        right_right = QueryExpression(NameAttribute(), EqualFilter(), "RE-10")
        right = OrCombinator(right_left, right_right)
        expected = AndCombinator(left, right)
        self.assertEqual(expected, expr)

    """
    Utility methods
    """

    def test_get_combinator_symbols_in(self):
        c_symbols = get_symbols_in_def("a&&b||c&&d", get_combinator_symbols())

        self.assertEqual(3, len(c_symbols))
        self.assertEqual("&&", c_symbols[0])
        self.assertEqual("||", c_symbols[1])
        self.assertEqual("&&", c_symbols[2])
