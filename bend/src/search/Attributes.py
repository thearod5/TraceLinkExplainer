from abc import ABC, abstractmethod
from typing import List

from search.Symbols import ISymbol, get_operation


class IAttribute(ISymbol, ABC):
    """
    Represents a property of an artifact (e.g. name, body, type)
    """

    @abstractmethod
    def get_filters(self) -> List[str]:
        pass

    def __eq__(self, other):
        return self.get_symbol() == other.get_symbol()


class AttributeController(IAttribute, ABC):
    @property
    def symbol(self):
        raise NotImplementedError()

    @property
    def filters(self):
        raise NotImplementedError()

    def get_symbol(self):
        return self.symbol

    def get_filters(self) -> List[str]:
        return self.filters


class NameAttribute(AttributeController):
    symbol = "name"
    filters = ["=", "!="]


class TypeAttribute(AttributeController):
    symbol = "type"
    filters = ["=", "!="]


class BodyAttribute(AttributeController):
    symbol = "body"
    filters = ["=", "!=", "~", "!~"]


REGISTERED_ATTRIBUTES: List[IAttribute] = [NameAttribute(), TypeAttribute(), BodyAttribute()]


class Attribute(IAttribute):
    def __init__(self, symbol: str):
        self.attribute = get_operation(REGISTERED_ATTRIBUTES, symbol)

    def get_symbol(self):
        return self.attribute.get_symbol()

    def get_filters(self) -> List[str]:
        return self.attribute.get_filters()
