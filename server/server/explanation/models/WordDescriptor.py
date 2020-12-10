from typing import List

from typing_extensions import TypedDict


class WordDescriptor:
    """
    Pairs a word, usually contained in an artifact, and its associated relationships
    """

    def __init__(self, word: str, relationship_ids=None):
        if relationship_ids is None:
            relationship_ids = []
        self.word = word
        self.relationship_ids = relationship_ids

    def add_family(self, family: str):
        self.relationship_ids.append(family)

    def to_dict(self):
        return {
            "word": self.word,
            "relationshipIds": self.relationship_ids
        }


class WordDescriptorDict(TypedDict):
    word: str
    families: List[str]
