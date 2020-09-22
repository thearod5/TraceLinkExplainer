from typing import Dict

from scipy.sparse import csr_matrix
from sklearn.preprocessing import minmax_scale

from models.Family import Family
from models.TracePayload import TraceRelationships
from models.WordDescriptor import WordDescriptor
from preprocessing.Cleaners import clean_doc
from vsm.CalculateSimilarityMatrix import create_term_frequency_matrix

VSM_RELATIONSHIP_NAME = "ROOT"


def add_root_families(dataset, trace_relationships: TraceRelationships, cutoff=0):
    families: dict[str, Family] = trace_relationships.relationships
    source_descriptors = trace_relationships.source_descriptors
    target_descriptors = trace_relationships.target_descriptors

    source_words = list(map(lambda wd: wd.word, source_descriptors))
    target_words = list(map(lambda wd: wd.word, target_descriptors))

    source_words_cleaned = list(map(clean_doc, source_words))
    target_words_cleaned = list(map(clean_doc, target_words))

    root_weight_mapping = get_vsm_weights(source_words_cleaned, target_words_cleaned, cutoff)
    add_root_family(source_descriptors, source_words_cleaned, root_weight_mapping.keys())
    add_root_family(target_descriptors, target_words_cleaned, root_weight_mapping.keys())

    for root, weight in root_weight_mapping.items():
        related_words = get_related_words(source_words, source_words_cleaned, root) + \
                        get_related_words(target_words, target_words_cleaned, root)
        families[root] = Family(weight, list(set(related_words)), VSM_RELATIONSHIP_NAME)

    return TraceRelationships(families, source_descriptors, target_descriptors)


def get_related_words(words, word_roots, root_target):
    assert len(words) == len(word_roots), "Expecting word-root to be 1 to 1"
    related_words = []
    for root_index, root in enumerate(word_roots):
        if root == root_target:
            related_words.append(words[root_index])
    return related_words


def add_root_family(word_descriptors: [WordDescriptor], roots: [str], selected_roots: [str]):
    for wd_index, wd in enumerate(word_descriptors):
        word_root = roots[wd_index]
        if word_root in selected_roots:
            wd.add_family(roots[wd_index])


def get_vsm_weights(source_root_words: [str],
                    target_root_words: [str],
                    weight_cutoff: float) -> Dict[str, float]:
    # 1. Create VSM weight matrices
    source_doc = " ".join(source_root_words)
    target_doc = " ".join(target_root_words)
    vectorizer, source_term_weight_matrix, target_term_weight_matrix = create_term_frequency_matrix(
        [source_doc], [target_doc], True)  # TODO : replace with all artifacts for more accurate description

    # 2. Sum weight matrices
    summed_term_weight_matrix = source_term_weight_matrix.multiply(
        target_term_weight_matrix)

    # 3.
    word_weight_mapping = create_word_similarity_dictionary(
        vectorizer.vocabulary_,
        summed_term_weight_matrix.toarray(),
        cutoff=weight_cutoff)

    return word_weight_mapping


def create_word_similarity_dictionary(word_index_mapping: Dict[str, int],
                                      similarity_matrix: csr_matrix,
                                      cutoff: float,
                                      normalize=True) -> Dict[str, float]:
    """
    :param word_index_mapping: Word to index dictionary. Given by sklearn.
    :param similarity_matrix: The similarity scores of some document.
    :param normalize: Put weights/similarities between scale between 0 and 1
    :param cutoff: Will only allow words with weights/similarities greater than this.
    :return: Dict - Contains words as keys and similarity scores as values
    """
    document_similarities = similarity_matrix[0, :]
    similarity_matrix = minmax_scale(document_similarities) if normalize else document_similarities

    result = {}
    for word, word_index in word_index_mapping.items():
        value = similarity_matrix[word_index]
        if value > cutoff:
            result[word] = value
    return result
