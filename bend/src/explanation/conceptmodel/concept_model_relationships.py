from explanation.cleaners import clean_doc
from explanation.conceptmodel.concept_model import ConceptModel, ConceptModelFactory
from explanation.models.trace_information import TraceExplanation, Relationship
from explanation.models.word_descriptor import WordDescriptor


def add_concept_families(dataset: str, explanation: TraceExplanation) -> TraceExplanation:
    concept_model = ConceptModelFactory.get_model(dataset)

    source_words_cleaned = list(map(lambda w_d: clean_doc(w_d.word), explanation.source_descriptors))
    source_words_cleaned_filtered = list(set(filter(lambda w: len(w) > 0, source_words_cleaned)))

    target_words_cleaned = list(map(lambda w: clean_doc(w.word), explanation.target_descriptors))
    target_words_cleaned_filtered = list(set(filter(lambda w: len(w) > 0, target_words_cleaned)))

    concept_model_relationships = get_relationships_for_concept_model(concept_model,
                                                                      source_words_cleaned_filtered,
                                                                      target_words_cleaned_filtered)
    add_relationships_to_word_descriptors(explanation,
                                          concept_model_relationships,
                                          source_words_cleaned,
                                          target_words_cleaned)

    explanation.relationships = explanation.relationships + concept_model_relationships
    return explanation


def get_relationships_for_concept_model(concept_model: ConceptModel,
                                        source_words: [str],
                                        target_words: [str]):
    concept_model_relationships = []
    for source_word in source_words:
        word_relationships = concept_model.get_word_relationships(source_word,
                                                                  target_words)
        concept_model_relationships = concept_model_relationships + word_relationships
    return concept_model_relationships


def add_relationships_to_word_descriptors(explanation: TraceExplanation,
                                          relationships: [Relationship],
                                          source_words: [str],
                                          target_words: [str]):
    attach_relationship_ids_to_word_descriptors(source_words,
                                                relationships,
                                                explanation.source_descriptors)
    attach_relationship_ids_to_word_descriptors(target_words,
                                                relationships,
                                                explanation.target_descriptors)


def attach_relationship_ids_to_word_descriptors(
        words: [str],
        relationships: [Relationship],
        descriptors: [WordDescriptor]):
    for word_index, word in enumerate(words):
        for word_relationship in relationships:
            words_in_relationship = list(map(lambda node: node.word, word_relationship.nodes))
            if word in words_in_relationship:
                descriptors[word_index].relationship_ids.append(word_relationship.title)
