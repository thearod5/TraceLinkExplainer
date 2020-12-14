from typing import Dict

from scipy.sparse import csr_matrix
from sklearn.preprocessing import minmax_scale

from explanation.Cleaners import clean_doc
from explanation.conceptmodel.CalculateSimilarityMatrix import create_term_frequency_matrix
from explanation.models.TraceInformation import TraceExplanation, Relationship, WordRelationshipNode, SYN
from explanation.models.WordDescriptor import WordDescriptor

VSM_RELATIONSHIP_NAME = "ROOT"


def add_root_relationships(dataset, trace_relationships: TraceExplanation, cutoff=0) -> TraceExplanation:
    relationships: [Relationship] = trace_relationships.relationships
    source_descriptors = trace_relationships.source_descriptors
    target_descriptors = trace_relationships.target_descriptors

    source_words = list(map(lambda wd: wd.word, source_descriptors))
    target_words = list(map(lambda wd: wd.word, target_descriptors))

    source_words_cleaned = list(map(clean_doc, source_words))
    target_words_cleaned = list(map(clean_doc, target_words))

    root_weight_mapping = get_vsm_weights(source_words_cleaned, target_words_cleaned, cutoff)
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
    :param valid_roots: represents the set of word roots that have a non-zero weight in VSM weighting scheme.
    :return:
    """
    for wd_index, wd in enumerate(word_descriptors):
        word_root = word_roots[wd_index]
        if word_root in valid_roots:
            wd.add_family(word_roots[wd_index])


def get_related_words(words, word_roots, root_target):
    assert len(words) == len(word_roots), "Expecting word-root to be 1 to 1"
    related_words = []
    for root_index, root in enumerate(word_roots):
        if root == root_target:
            related_words.append(words[root_index])
    return related_words


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
