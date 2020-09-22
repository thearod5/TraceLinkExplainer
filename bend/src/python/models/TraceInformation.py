from typing_extensions import TypedDict

from typing_extensions import TypedDict

from models.Family import FamilyDict
from models.WordDescriptor import WordDescriptor, WordDescriptorDict


class WordRelationshipNode:
    """
    A node in the path describing a relationship
    """

    def __init__(self, word: str, node_type: str):
        self.word = word
        self.node_type = node_type


class Relationship:
    """
    A series of nodes describing why two artifacts are related.
    """

    def __init__(self, title: str, nodes: [WordRelationshipNode]):
        self.title = title
        self.nodes = nodes


class TraceExplanation:
    """
    A series of relationships (or reasons) why two artifacts are related.
    Note, Artifacts are stored as a list of words
    """

    def __init__(self,
                 source_descriptors: [WordDescriptor],
                 target_descriptors: [WordDescriptor],
                 relationships: [Relationship],
                 ):
        self.relationships = relationships
        self.source_descriptors = source_descriptors
        self.target_descriptors = target_descriptors


class TracePayload:
    def __init__(self,
                 trace_relationships: TraceExplanation,
                 trace_type: str,
                 score: float):
        self.relationships = trace_relationships.relationships
        self.source_descriptors = trace_relationships.source_descriptors
        self.target_descriptors = trace_relationships.target_descriptors
        self.trace_type = trace_type
        self.score = score


class TracePayloadDict(TypedDict):
    families: FamilyDict
    sourceDescriptors: WordDescriptorDict
    targetDescriptors: WordDescriptorDict
    trace_type: str
    score: float
