from django.db.models import Q

from search.Attributes import Attribute
from search.Combinators import get_combinator_symbols, Combinator, ICombinator
from search.Expressions import IExpr, QueryExpression
from search.Filters import get_operation_symbols, Filter
from search.ParserUtil import get_symbols_in_def


def create_value_from_definition(definition: str):
    return definition.replace("\"", "").replace("'", "")


def create_filter_from_definition(definition: str) -> QueryExpression:
    operation_symbol = get_symbols_in_def(definition, get_operation_symbols())[0]

    def_parts = definition.split(operation_symbol)
    assert len(def_parts) == 2, 'expected [attribute][operation][value] got: %s' % definition

    attribute = Attribute(def_parts[0].strip())
    operation = Filter(operation_symbol)
    value = parse_definition(def_parts[1].strip())
    return QueryExpression(attribute, operation, value)


def create_combinator_from_definition(definition: str, symbol: str) -> ICombinator:
    def_parts = definition.split(symbol)
    assert len(def_parts) == 2, "expected at 2 expressions in %s" % "_".join(def_parts)
    left = create_filter_from_definition(def_parts[0])
    right = create_value_from_definition(def_parts[1])
    return Combinator(symbol, left, right)


def parse_definition(definition: str):
    o_symbols_in_def = get_symbols_in_def(definition, get_operation_symbols())
    n_operation_symbols = len(o_symbols_in_def)

    c_symbols_in_def = get_symbols_in_def(definition, get_combinator_symbols())
    n_combinator_symbols = len(c_symbols_in_def)

    if n_operation_symbols == 0 and n_combinator_symbols == 0:  # a value
        return create_value_from_definition(definition)
    elif n_combinator_symbols == 0:  # filtered expression
        return create_filter_from_definition(definition)
    elif n_combinator_symbols >= 1:  # a combined expression
        curr_symbol = c_symbols_in_def[0]
        d_parts = definition.split(curr_symbol)
        left = parse_definition(d_parts[0])
        right = parse_definition(d_parts[1])
        return Combinator(curr_symbol, left, right)
    else:
        raise ValueError("received a negative number of elements")


class Expression(IExpr):
    def __init__(self, definition: str):
        self.expression = parse_definition(definition)

    def eval(self) -> Q:
        return self.expression.eval()

    def get_symbol(self) -> str:
        return self.expression.get_symbol()
