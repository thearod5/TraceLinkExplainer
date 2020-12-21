from abc import ABC, abstractmethod
from typing import List

from django.db.models import Q

from search.symbols import get_operation, NOT_SYMBOL


class IFilter(ABC):

    @abstractmethod
    def create_query(self, field_name: str, field_value: str) -> Q:
        pass

    @abstractmethod
    def get_symbol(self) -> str:
        pass

    def __eq__(self, other):
        return self.get_symbol() == other.get_symbol()


class FilterController(IFilter, ABC):
    """
    Represents some filtering action on a projects artifacts
    """

    @property
    def symbol(self):
        raise NotImplementedError

    @property
    def field_suffix(self):
        raise NotImplementedError

    def get_symbol(self) -> str:
        return self.symbol

    def create_query(self, field_name: str, field_value: str) -> Q:
        query_kwargs = "%s%s" % (field_name, self.field_suffix)
        return Q(**{query_kwargs: field_value})

    def __eq__(self, other):
        return self.get_symbol() == other.get_symbol()


class EqualFilter(FilterController):
    symbol = "="
    field_suffix = ""


class DoesNotEqualFilter(EqualFilter):
    symbol = "!="

    def create_query(self, field_name: str, field_value: str) -> Q:
        return ~super().create_query(field_name, field_value)


class ContainsFilter(FilterController):
    symbol = "~"
    field_suffix = "__icontains"


class DoesNotContainFilter(ContainsFilter):
    symbol = "!~"

    def create_query(self, field_name: str, field_value: str) -> Q:
        return ~super().create_query(field_name, field_value)


class GreaterThanEqualToFilter(FilterController):
    symbol = ">="
    field_suffix = "__lte"


class LessThanEqualToFilter(FilterController):
    symbol = "<="
    field_suffix = "__gte"


class GreaterThanFilter(FilterController):
    symbol = ">"
    field_suffix = "__lt"


class LessThanFilter(FilterController):
    symbol = "<"
    field_suffix = "__gt"


REGISTERED_OPERATIONS: List[IFilter] = [EqualFilter(),
                                        DoesNotEqualFilter(),
                                        ContainsFilter(),
                                        DoesNotContainFilter(),
                                        GreaterThanEqualToFilter(),
                                        LessThanEqualToFilter(),
                                        GreaterThanFilter(),
                                        LessThanFilter()]


def get_operation_symbols() -> List[str]:
    return list(map(lambda r_op: r_op.get_symbol(), REGISTERED_OPERATIONS))


class Filter(IFilter):

    def __init__(self, name: str):
        self.not_filter = name[0] == NOT_SYMBOL
        self.symbol = name
        name_without_not = name[1:] if self.not_filter else name

        self.filter: IFilter = get_operation(REGISTERED_OPERATIONS, name_without_not)

    def get_symbol(self) -> str:
        return self.symbol

    def create_query(self, field_name, field_value) -> Q:
        q = self.filter.create_query(field_name, field_value)
        return ~q if self.not_filter else q

    def __eq__(self, other):
        return self.get_symbol() == other.get_symbol()
