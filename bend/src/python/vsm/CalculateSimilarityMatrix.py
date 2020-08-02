import json
import os
import pathlib

import pandas as pd
from scipy.sparse import vstack
from sklearn.decomposition import TruncatedSVD
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import pairwise_distances
from sklearn.preprocessing import minmax_scale

from data.DataLoader import get_all_artifacts_for_dataset

#import Cleaners

"""
A DistanceMatrix is a 

multi-dimensional matrix containing similarity scores calculated
via cosine_similarity.
"""

"""
A TermFrequencyMatrix is a 

multi-dimensional matrix containing as rows a set of 
textual documents and as columns each word appearing in the aggregate vocabulary of
the documents. Each entry in the matrix is a number meant to represent how much
"weight" a given column (word) has in each row (text doc).

"""


def calculate_similarity_matrix(raw_a, raw_b, logger=None):
    """
    Calculates DistanceMatrix by transforming given documents into
    term frequency matrices (weighted via TF-IDF).

    :param raw_a: {Listof String} - docs representing the rows of the matrix
    :param raw_b: {Listof String} - docs representing the columns of the matrix
    :param max_features:
    :return: {DistanceMatrix} From A to B
    """
    logger.set_message(
        "Creating Term Frequency Matrix") if logger is not None else None
    set_a, set_b = create_term_frequency_matrix(raw_a, raw_b)
    logger.set_message(
        "Calculating similarities via VSM") if logger is not None else None
    similarity_matrix = calculate_similarity_matrix_from_term_frequencies(
        set_a, set_b)
    logger.set_message(
        "Similarity Matrix Calculated") if logger is not None else None
    return similarity_matrix


def calculate_similarity_matrix_lsa(raw_a, raw_b, logger=None):
    """
    Creates a Distance Matrix (calc. via cosine-similarity)
    where the given matrix is first reduced via lsa.

    Note, the resulting dimensions of the singular value decomposition is (a, a) where
    a = min(number of documents, number components, number of features). In our case,
    requirements + designs normally will not satisfy 100 records. In means that our
    number of resulting components varying between the upper and lower matrices.

    :param raw_a {Listof String} - Represents the rows of the matrix
    :param raw_b {Listof String} - Represents the cols of the matrix
    :return {SimilarityMatrix} From every doc in A to B
    """
    logger.set_message(
        "Creating Term Frequency Matrix") if logger is not None else None
    matrix_a, matrix_b = create_term_frequency_matrix(raw_a, raw_b)
    n_components = min(len(raw_a), len(raw_b))  # average number of documents

    # Singular Value Decomposition on Term Frequencies = LSA
    lsa_model = TruncatedSVD(n_components=n_components)
    # essentially appending docs vectorized
    lsa_model.fit(vstack([matrix_a, matrix_b]))
    matrix_a_lsa = lsa_model.transform(matrix_a)
    matrix_b_lsa = lsa_model.transform(matrix_b)
    logger.set_message(
        "Calculating similarities via VSM") if logger is not None else None

    similarity_matrix = calculate_similarity_matrix_from_term_frequencies(
        matrix_a_lsa, matrix_b_lsa)
    # Note, LSA can return values > 1 so we scale them.
    similarity_matrix = minmax_scale(similarity_matrix)
    logger.set_message(
        "Similarity Matrix Calculated.") if logger is not None else None
    return similarity_matrix


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


def calculate_similarity_matrix_from_term_frequencies(tf_a, tf_b):
    return 1 - pairwise_distances(tf_a, Y=tf_b, metric="cosine", n_jobs=-1)
