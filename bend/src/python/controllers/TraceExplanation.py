import numpy as np
import pandas as pd
from sklearn.preprocessing import minmax_scale

from data.DataLoader import get_artifact_in_dataset
from preprocessing.Cleaners import (clean_doc, get_camel_case_words,
                                    replace_alpha_charater, to_lower)
from vsm.CalculateSimilarityMatrix import create_term_frequency_matrix

word_splitters = [".", "\n", "\t", " ", "(", ")", ":", ",",
                  ";", "[", "]", "{", "}", "\'", "\"", "|", "&", "*"]


def get_trace_information(dataset: str, source_type: str, source_id: str, target_type: str, target_id: str):
    # 1. Create FEND words
    source_words = get_words_in_artifact(dataset, source_type, source_id)
    target_words = get_words_in_artifact(dataset, target_type, target_id)

    families, source_word_weight_list, target_word_weight_list = create_mappings(
        source_words, target_words)

    return {
        "families": families,
        "sourceWords": source_word_weight_list,
        "targetWords": target_word_weight_list,
        "traceType": "MANUAL",
        "score": 0.5,
    }


def get_words_in_artifact(dataset: str, artifact_type: str, artifact_id: str):
    artifact = get_artifact_in_dataset(
        dataset, artifact_type, artifact_id)["body"]
    return get_words_in_string_doc(artifact)


def create_mappings(source_words: [str], target_words: [str]):
    # 1. Create cleaned words (for VSM)
    source_cleaned_words = list(map(clean_doc, source_words))
    target_cleaned_words = list(map(clean_doc, target_words))

    # 2. Create mapping between them
    source_root_mapping = create_dictionary_from_values(
        {}, source_words, source_cleaned_words)
    word_root_mapping = create_dictionary_from_values(
        source_root_mapping, target_words, target_cleaned_words)

    root_weight_mapping = create_root_weight_mapping(
        source_cleaned_words, target_cleaned_words)

    source_word_weight_list = create_word_weight_list(
        source_words, word_root_mapping, root_weight_mapping)
    target_word_weight_list = create_word_weight_list(
        target_words, word_root_mapping, root_weight_mapping)

    families = list(set(root_weight_mapping.keys()))

    return families, source_word_weight_list, target_word_weight_list


def create_word_weight_list(words: [str],
                            word_root_mapping: dict,
                            root_weight_mapping: dict):
    word_weight_list = []
    for word in words:
        word_root = word_root_mapping[word]
        has_nonempty_root = word_root in root_weight_mapping.keys()
        word_weight = root_weight_mapping[word_root]["weight"] if has_nonempty_root else 0
        word_weight_list.append({
            "word": word,
            "family": word_root,
            "weight": word_weight
        })
    return word_weight_list


def create_root_weight_mapping(source_root_words: [str], target_root_words: [str]):
    # 1. Create VSM weight matrices
    source_doc = " ".join(source_root_words)
    target_doc = " ".join(target_root_words)
    vectorizer, source_term_weight_matrix, target_term_weight_matrix = create_term_frequency_matrix(
        [source_doc], [target_doc], True)  # TODO : replace with all artifacts for more accurate description

    # 2. Sum weight matrices
    summed_term_weight_matrix = (
        source_term_weight_matrix + target_term_weight_matrix)

    # 3.
    word_weight_mapping = create_word_weight_dictionary(
        vectorizer.vocabulary_, summed_term_weight_matrix.toarray(), cutoff=0.5)

    return word_weight_mapping


def create_word_weight_dictionary(word_index_mapping: dict, weight_matrix, normalize=True, cutoff=-1):
    weight_matrix = minmax_scale(
        weight_matrix[0, :]) if normalize else weight_matrix

    result = {}
    for word, word_index in word_index_mapping.items():
        value = weight_matrix[word_index]
        if value > cutoff:
            result[word] = {
                "weight": value
            }
    return result


def get_words_in_string_doc(doc: str, word_splitters=word_splitters, append_word_splitter=True):
    """
    Continously splits words on every string in word_splitters and returns a list of words (containing the word_splitters).
    : param: doc - The string to split on
    : param: word_splitters - List of strings to split on
    : param: append_word_splitter - Whether to add back in the word splitters are splitting
    """
    words = get_camel_case_words(doc)

    for word_splitter in word_splitters:
        new_words = []
        for word in words:
            if word == "":
                continue
            split_words = word.split(word_splitter)
            last_item_index = len(split_words) - 1

            for new_word_index, new_word in enumerate(split_words):
                new_words.append(new_word)
                if new_word_index < last_item_index and append_word_splitter:
                    new_words.append(word_splitter)
        words = new_words.copy()
    return words


def create_dictionary_from_values(source: dict, keys: [str], values: [str]):
    """
    Returns a dict with keys being the values of `keys` and values being the values of `values`.
    """
    assert len(keys) == len(values), values
    for key_index, key in enumerate(keys):
        source[key] = values[key_index]
    return source


"""
Tests
"""


# TODO assert False, create_root_weight_mapping(
#     ["the pig danced"], ["the dancing kim"])

assert get_words_in_string_doc("dispatchQueueManager.getGroundStationId()") == [
    "dispatch", "Queue", "Manager", ".", "get", "Ground", "Station", "Id", "(", ")"]


assert create_dictionary_from_values({}, ["foo"], ["bar"]) == {"foo": "bar"}
