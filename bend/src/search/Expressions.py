from abc import ABC, abstractmethod

from django.db.models import Q

from search.Attributes import IAttribute
from search.Filters import IFilter
from search.Symbols import Value


class IExpr(ABC):
    """
    An expr is one of:
    - [attribute][other][value] (e.g. name=RE-8)
    - [expr] [combinator] [expr] (e.g. name=RE-8^^type=requirements)
    """

    @abstractmethod
    def eval(self) -> Q:
        pass


class QueryExpression(IExpr):
    def __init__(self, attribute: IAttribute, expression_filter: IFilter, value: Value):
        super().__init__()
        self.attribute = attribute
        self.expression_filter = expression_filter
        self.value = value
        self._assert_operation_defined()

    def _assert_operation_defined(self):
        assert self.expression_filter.get_symbol() in self.attribute.get_filters(), "filter %s not defined on %s" % (
            self.expression_filter.get_symbol(), self.attribute.get_symbol())

    def eval(self) -> Q:
        return self.expression_filter.create_query(self.attribute.get_symbol(), self.value)

    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        return self.attribute == other.attribute and self.expression_filter == other.expression_filter and self.value == other.value
