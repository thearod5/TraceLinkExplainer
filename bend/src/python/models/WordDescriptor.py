from typing import List

from typing_extensions import TypedDict


class WordDescriptor:
    def __init__(self, word: str, families=None):
        if families is None:
            families = []
        self.word = word
        self.families = families

    def add_family(self, family: str):
        self.families.append(family)


class WordDescriptorDict(TypedDict):
    word: str
    families: List[str]
