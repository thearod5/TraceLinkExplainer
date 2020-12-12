from typing import List

from typing_extensions import TypedDict

from explanation.models.WordDescriptor import WordDescriptor, WordDescriptorDict

ANC = "ANCESTOR"
CHILD = "CHILD"
SIB = "SIBLING"
SYN = "SYNONYM"
SOURCE = "SOURCE"


class WordRelationshipNode:
    """
    A node in the path describing a relationship
    """

    def __init__(self, word: str, node_type: str):
        self.word = word
        self.node_type = node_type

    def to_dict(self):
        return {
            "word": self.word,
            "nodeType": self.node_type
        }


class WordRelationshipNodeDict(TypedDict):
    word: str
    node_type: str


class Relationship:
    """
    A series of nodes describing why two artifacts are related.
    """

    def __init__(self, title: str, nodes: [WordRelationshipNode], weight: float):
        self.title = title
        self.nodes = nodes
        self.weight = weight

    def to_dict(self):
        return {
            "title": self.title,
            "nodes": list(map(lambda wr: wr.to_dict(), self.nodes)),
            "weight": self.weight
        }


class RelationshipDict(TypedDict):
    title: str
    nodes: List[WordRelationshipNodeDict]
    weight: float


class TraceExplanation:
    """
    A series of relationships (or reasons) why two artifacts are related.
    Note, Artifacts are stored as a list of words
    """

    def __init__(self,
                 source_descriptors: [WordDescriptor],
                 target_descriptors: [WordDescriptor],
                 relationships: [Relationship] = None,
                 ):
        self.source_descriptors = source_descriptors
        self.target_descriptors = target_descriptors
        self.relationships = [] if relationships is None else relationships

    def to_dict(self) -> dict:
        return {
            "sourceDescriptors": list(map(lambda sd: sd.to_dict(), self.source_descriptors)),
            "targetDescriptors": list(map(lambda sd: sd.to_dict(), self.target_descriptors)),
            "relationships": list(map(lambda sd: sd.to_dict(), self.relationships))
        }


class TracePayloadDict(TypedDict):
    relationships: RelationshipDict
    sourceDescriptors: WordDescriptorDict
    targetDescriptors: WordDescriptorDict
    trace_type: str
    score: float


class TraceInformation(TraceExplanation):
    """
    The BEND response to FEND encapsulating all
    """

    def __init__(self,
                 trace_relationships: TraceExplanation,
                 trace_type: str,
                 score: float):
        super(TraceInformation, self).__init__(trace_relationships.source_descriptors,
                                               trace_relationships.target_descriptors,
                                               trace_relationships.relationships)
        self.trace_type = trace_type
        self.score = score

    def to_dict(self) -> TracePayloadDict:
        super_dict = super(TraceInformation, self).to_dict()
        super_dict["traceType"] = self.trace_type
        super_dict["score"] = self.score
        return super_dict
