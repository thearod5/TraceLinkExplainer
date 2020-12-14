from abc import ABC, abstractmethod
from typing import TypeVar, List

Value = str
NOT_SYMBOL = "!"


class ISymbol(ABC):
    @abstractmethod
    def get_symbol(self):
        raise NotImplementedError()


QueryOperationType = TypeVar("QueryOperationType")


def get_operation(q_operations: List[QueryOperationType], symbol: str) -> QueryOperationType:
    for f in q_operations:
        if f.symbol == symbol:
            return f
    raise ValueError("no filter contains name: %s" % symbol)
