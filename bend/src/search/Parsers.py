import pandas as pd
from django.db.models import Q

from search.Combinators import Combinator, get_combinator_symbols, ICombinator
from search.attributes import Attribute
from search.expressions import IExpr, QueryExpression
from search.filters import get_operation_symbols, Filter


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


def get_symbols_in_def(definition: str, c_symbols):
    if len(definition) == 0:
        return []

    df_values = list(filter(lambda p: p[1] >= 0, map(lambda cs: (cs, definition.find(cs)), c_symbols)))
    if len(df_values) == 0:
        return []
    df = pd.DataFrame(df_values, columns=["symbol", 'index_in_def'])

    sorted_df = df.sort_values(by='index_in_def')
    iteration_symbols = list(sorted_df['symbol'])
    last_symbol = sorted_df.iloc[-1]
    remaining_def = definition[last_symbol["index_in_def"] + len(last_symbol['symbol']):]
    return iteration_symbols + get_symbols_in_def(remaining_def, c_symbols)
