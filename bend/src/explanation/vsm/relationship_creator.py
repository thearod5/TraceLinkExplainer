"""
Modules specifies the methods that add vsm relationships
to a trace explanation.
"""

from typing import Dict, List

from scipy.sparse import csr_matrix
from sklearn.preprocessing import minmax_scale

from explanation.cleaners import clean_doc
from explanation.models.trace_information import TraceExplanation, \
    Relationship, WordRelationshipNode, SYN
from explanation.models.word_descriptor import WordDescriptor
from explanation.vsm.frequency_matrix import create_term_frequency_matrix

VSM_RELATIONSHIP_NAME = "ROOT"
WordWeightMapping = Dict[str, float]


def add_root_relationships(
        explanation: TraceExplanation,
        dataset=None,
        cutoff=0) -> TraceExplanation:
    """
    Main function that adds relationships between words with the same stem word and
    weights the relationships by their TFIDF score
    """
    relationships: [Relationship] = explanation.relationships
    source_descriptors = explanation.source_descriptors
    target_descriptors = explanation.target_descriptors

    source_words: List[str] = list(map(lambda s_word: s_word.word, source_descriptors))
    target_words: List[str] = list(map(lambda t_word: t_word.word, target_descriptors))

    source_words_cleaned: List[str] = list(map(clean_doc, source_words))
    target_words_cleaned: List[str] = list(map(clean_doc, target_words))

    root_weight_mapping: WordWeightMapping = get_vsm_weights(
        source_words_cleaned,
        target_words_cleaned,
        cutoff)
    add_relationship_ids(source_descriptors, source_words_cleaned, root_weight_mapping.keys())
    add_relationship_ids(target_descriptors, target_words_cleaned, root_weight_mapping.keys())

    for root, weight in root_weight_mapping.items():
        related_words = get_related_words(source_words, source_words_cleaned, root) + \
                        get_related_words(target_words, target_words_cleaned, root)
        related_words = list(set(related_words))
        related_word_nodes = list(map(lambda word: WordRelationshipNode(word, SYN), related_words))
        relationships.append(Relationship(root, related_word_nodes, weight))

    return TraceExplanation(source_descriptors, target_descriptors, relationships)


def add_relationship_ids(
        word_descriptors: [WordDescriptor],
        word_roots: [str],
        valid_roots: [str]):
    """
    For each word descriptor, add its stemmed root (which is the relationship id), to list of linked
    relationships for that word.
    :param word_descriptors:
    :param word_roots: 1-1 mapping to word_descriptors containing its morphological root
    :param valid_roots: represents the set of word roots that
    have a non-zero weight in VSM weighting scheme.
    :return:
    """
    for w_index, w_descriptor in enumerate(word_descriptors):
        word_root = word_roots[w_index]
        if word_root in valid_roots:
            w_descriptor.add_family(word_roots[w_index])


def get_related_words(words: [str], word_roots, root_target) -> List[str]:
    """
    Returns list of words with the same root as target word
    """
    assert len(words) == len(word_roots), "Expecting word-root to be 1 to 1"
    related_words: List[str] = []
    for root_index, root in enumerate(word_roots):
        if root == root_target:
            related_words.append(words[root_index])
    return related_words


def get_vsm_weights(source_root_words: [str],
                    target_root_words: [str],
                    weight_cutoff: float) -> WordWeightMapping:
    """
    Returns the word-weight mapping containing the words
    with their TFIDF scores, if they were above given
    threshold
    """
    # 1. Create VSM weight matrices
    source_doc = " ".join(source_root_words)
    target_doc = " ".join(target_root_words)
    vectorizer, source_term_weight_matrix, target_term_weight_matrix = create_term_frequency_matrix(
        [source_doc], [target_doc], True)

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
                                      normalize=True) -> WordWeightMapping:
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
