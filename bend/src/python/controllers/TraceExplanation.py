from conceptmodel.ConceptModelRelationships import add_concept_families
from loader.DataLoader import get_artifact_in_dataset
from models.TracePayload import TracePayload, TraceRelationships, TracePayloadDict
from models.WordDescriptor import WordDescriptor
from preprocessing.Cleaners import (get_words_in_string_doc)
from util.DictHelper import list_as_dict, export_object_as_dict
from vsm.WordRootRelationships import add_root_families


def get_trace_information(
        dataset: str,
        source_type: str,
        source_id: str,
        target_type: str,
        target_id: str) -> TracePayloadDict:
    # 1. Create FEND words
    source_words = get_words_in_artifact(dataset, source_type, source_id)
    target_words = get_words_in_artifact(dataset, target_type, target_id)

    trace_relationships = create_trace_payload(
        dataset, source_words, target_words)

    payload = TracePayload(trace_relationships, "MANUAL", 0)
    return {
        "families": export_object_as_dict(payload.families),
        "sourceDescriptors": list_as_dict(payload.source_descriptors),
        "targetDescriptors": list_as_dict(payload.target_descriptors),
        "traceType": "Manual",
        "score": 1
    }


def get_words_in_artifact(dataset: str, artifact_type: str, artifact_id: str):
    artifact = get_artifact_in_dataset(
        dataset, artifact_type, artifact_id)["body"]
    return get_words_in_string_doc(artifact)


def create_trace_payload(dataset: str, source_words: [str], target_words: [str]) -> TraceRelationships:
    source_word_descriptors = list(map(WordDescriptor, source_words))
    target_word_descriptors = list(map(WordDescriptor, target_words))
    families = {}

    relationships = TraceRelationships(families, source_word_descriptors, target_word_descriptors)

    pipeline = [add_root_families, add_concept_families]
    for pipeline_function in pipeline:
        relationships = pipeline_function(dataset, relationships)

    return relationships
