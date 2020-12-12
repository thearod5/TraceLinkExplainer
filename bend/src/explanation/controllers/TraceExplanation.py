from api import models
from explanation.models.TraceInformation import TraceInformation, TraceExplanation, TracePayloadDict
from explanation.models.WordDescriptor import WordDescriptor
from explanation.preprocessing.Cleaners import get_words_in_string_doc
from explanation.relationships.conceptmodel.ConceptModelRelationships import add_concept_families
from explanation.relationships.vsm.VSMRelationships import add_root_relationships


def get_trace_information(
        dataset_name: str,
        source_name: str,
        target_name: str) -> TracePayloadDict:
    source_artifact = models.Artifact.objects.get(dataset__name=dataset_name, name=source_name)
    target_artifact = models.Artifact.objects.get(dataset__name=dataset_name, name=target_name)

    source_words = get_words_in_string_doc(source_artifact.text)
    target_words = get_words_in_string_doc(target_artifact.text)

    trace_explanation: TraceExplanation = create_trace_payload(dataset_name, source_words, target_words)

    payload = TraceInformation(trace_explanation, "MANUAL", 0)
    return payload.to_dict()


def create_trace_payload(dataset: str, source_words: [str], target_words: [str]) -> TraceExplanation:
    source_word_descriptors = list(map(WordDescriptor, source_words))
    target_word_descriptors = list(map(WordDescriptor, target_words))
    explanation = TraceExplanation(source_word_descriptors, target_word_descriptors)

    pipeline = [add_root_relationships, add_concept_families]
    for pipeline_function in pipeline:
        explanation = pipeline_function(dataset, explanation)

    explanation.relationships = sorted(explanation.relationships, key=lambda x: x.weight, reverse=True)

    return explanation
