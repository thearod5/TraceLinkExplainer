from loader.DataLoader import get_artifact_in_dataset
from models.TraceInformation import TraceInformation, TraceExplanation, TracePayloadDict
from models.WordDescriptor import WordDescriptor
from preprocessing.Cleaners import (get_words_in_string_doc)
from relationships.conceptmodel.ConceptModelRelationships import add_concept_families
from relationships.vsm.VSMRelationships import add_root_relationships


def get_trace_information(
        dataset: str,
        source_type: str,
        source_id: str,
        target_type: str,
        target_id: str) -> TracePayloadDict:
    # 1. Create FEND words
    source_words = get_words_in_artifact(dataset, source_type, source_id)
    target_words = get_words_in_artifact(dataset, target_type, target_id)

    trace_explanation: TraceExplanation = create_trace_payload(
        dataset, source_words, target_words)

    payload = TraceInformation(trace_explanation, "MANUAL", 0)
    return payload.to_dict()


def get_words_in_artifact(dataset: str, artifact_type: str, artifact_id: str):
    artifact = get_artifact_in_dataset(
        dataset, artifact_type, artifact_id)["body"]
    return get_words_in_string_doc(artifact)


def create_trace_payload(dataset: str, source_words: [str], target_words: [str]) -> TraceExplanation:
    source_word_descriptors = list(map(WordDescriptor, source_words))
    target_word_descriptors = list(map(WordDescriptor, target_words))
    explanation = TraceExplanation(source_word_descriptors, target_word_descriptors)

    pipeline = [add_root_relationships, add_concept_families]
    for pipeline_function in pipeline:
        explanation = pipeline_function(dataset, explanation)

    explanation.relationships = sorted(explanation.relationships, key=lambda x: x.weight, reverse=True)

    return explanation
