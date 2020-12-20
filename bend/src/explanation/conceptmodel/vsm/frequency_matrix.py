"""
Set of functions for creating different similarity matrices using VSM
"""
from sklearn.feature_extraction.text import TfidfVectorizer


def create_term_frequency_matrix(raw_a, raw_b, return_vectorizer=False):
    """
    Creates 2 TermFrequencyMatrices (one for A another for B) where the weight of
    each (row, col) pair is calculated via TF-IDF
    :param raw_a : The documents whose matrix is the first element
    :param raw_b : The documents whose matrix is the second element
    :return: CountMatrix for raw_a and raw_b, and also the vocabulary used
    """
    raw_a = list(raw_a)
    raw_b = list(raw_b)
    model = TfidfVectorizer()
    combined = raw_a + raw_b
    model.fit(combined)  # creates vocabulary with features from both A and B
    set_a = model.transform(raw_a)
    set_b = model.transform(raw_b)
    if return_vectorizer:
        return model, set_a, set_b
    return set_a, set_b
