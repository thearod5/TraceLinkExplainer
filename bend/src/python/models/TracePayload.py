from typing import Dict

from typing_extensions import TypedDict

from models.Family import Family, FamilyDict
from models.WordDescriptor import WordDescriptor, WordDescriptorDict


class TraceRelationships:

    def __init__(self,
                 families: Dict[str, Family],
                 source_descriptors: [WordDescriptor],
                 target_descriptors: [WordDescriptor]
                 ):
        self.families = families
        self.source_descriptors = source_descriptors
        self.target_descriptors = target_descriptors


class TracePayload:
    def __init__(self,
                 relationships: TraceRelationships,
                 trace_type: str,
                 score: float):
        self.families = relationships.families
        self.source_descriptors = relationships.source_descriptors
        self.target_descriptors = relationships.target_descriptors
        self.trace_type = trace_type
        self.score = score


class TracePayloadDict(TypedDict):
    families: FamilyDict
    sourceDescriptors: WordDescriptorDict
    targetDescriptors: WordDescriptorDict
    trace_type: str
    score: float
