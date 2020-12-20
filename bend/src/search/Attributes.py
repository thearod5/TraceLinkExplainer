"""
An attributes represents a field in a model.
For example, in the Project modal contains a `name` attribute.
"""

from abc import ABC, abstractmethod
from typing import List

from search.Symbols import ISymbol, get_operation


class IAttribute(ISymbol, ABC):
    """
    interface to allow wrapper classes (e.g. Attribute) to be built on top of core attributes
    """

    @abstractmethod
    def get_filters(self) -> List[str]:
        """
        Returns a list of symbols corresponding to the filters that can be applied to IAttribute
        """

    def __eq__(self, other):
        return self.get_symbol() == other.get_symbol()


class CoreAttribute(ABC):
    """
    Specification for a Attribute enforcing required information
    """

    @property
    def name(self):
        """
        The name of the attribute.
        """
        raise NotImplementedError()

    @property
    def filters(self):
        """
        List of filter symbols that can be applied to attribute.
        """
        raise NotImplementedError()


class CoreAttributeDecorator(IAttribute):
    """
    Decorator class specifying IAttribute methods for a core attribute
    """

    def __init__(self, core_attribute: CoreAttribute):
        self.core_attribute = core_attribute

    def get_symbol(self):
        """
        Returns symbols of decorated attribute.
        """
        return self.core_attribute.name

    def get_filters(self) -> List[str]:
        """
        Returns valid filter symbols of decorated attribute.
        """
        return self.core_attribute.filters


class NameAttribute(CoreAttribute):
    """
    Attribute representing the label of an artifact.
    """
    name = "name"
    filters = ["=", "!=", "<", ">", ">=", "<=", "~", "!~"]


class TypeAttribute(CoreAttribute):
    """
    Attribute representing an artifact's type, being one a string enum value.
    """
    name = "type"
    filters = ["=", "!="]


class BodyAttribute(CoreAttribute):
    """
    Attribute representing the text body of an artifact.
    """
    name = "body"
    filters = ["=", "!=", "~", "!~"]


# because py lint doesn't handle decorators
REGISTERED_ATTRIBUTES: List[IAttribute] = [CoreAttributeDecorator(NameAttribute()),
                                           CoreAttributeDecorator(TypeAttribute()),
                                           CoreAttributeDecorator(BodyAttribute())]


class Attribute(IAttribute):
    """
    Proxy class wrapping all registered attributes and choosing one of them at construction.
    """

    def __init__(self, symbol: str):
        self.attribute = get_operation(REGISTERED_ATTRIBUTES, symbol)

    def get_symbol(self):
        """
        Returns the name of attribute with constructed symbol.
        """
        return self.attribute.get_symbol()

    def get_filters(self) -> List[str]:
        """
        Returns list of filter symbols of attribute with constructed symbol.
        """
        return self.attribute.get_filters()
