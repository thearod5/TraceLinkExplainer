from abc import ABC
from typing import List, Type

from django.db.models import Q

from search.Expressions import IExpr
from search.Symbols import ISymbol, get_operation


class ICombinator(IExpr, ISymbol, ABC):
    def __init__(self, left: IExpr, right: IExpr):
        self.left = left
        self.right = right

    def __eq__(self, other):
        return self.left == other.left and self.right == other.right and self.get_symbol() == other.get_symbol()


class CombinatorController(ICombinator, ABC):
    def __init__(self, left: IExpr, right: IExpr):
        self.left = left
        self.right = right

    @property
    def symbol(self):
        raise NotImplementedError()

    def get_symbol(self):
        return self.symbol


class AndCombinator(CombinatorController):
    symbol = "^^"

    def eval(self) -> Q:
        return self.left.eval() & self.right.eval()


class OrCombinator(CombinatorController):
    symbol = "||"

    def eval(self) -> Q:
        return self.left.eval() | self.right.eval()


REGISTERED_COMBINATORS: List[Type[CombinatorController]] = [AndCombinator, OrCombinator]


def get_combinator_symbols():
    return list(map(lambda c: c.symbol, REGISTERED_COMBINATORS))


class Combinator(ICombinator):
    def __init__(self, symbol: str, left: IExpr, right: IExpr):
        super().__init__(left, right)
        self.combinator = get_operation(REGISTERED_COMBINATORS, symbol)(left, right)

    def eval(self) -> Q:
        return self.combinator.eval()

    def get_symbol(self) -> str:
        return self.combinator.get_symbol()
