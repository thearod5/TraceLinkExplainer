from typing import List

from typing_extensions import TypedDict


class Family:
    def __init__(self, weight, related_concepts, type):
        self.weight = weight
        self.concepts = related_concepts
        self.type = type


class FamilyDict(TypedDict):
    weight: float
    concepts: List[str]
    type: str
