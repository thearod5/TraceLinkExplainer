import numpy as np
import pandas as pd
from sklearn.preprocessing import minmax_scale

from data.DataLoader import get_artifact_in_dataset
from preprocessing.Cleaners import (clean_doc, get_camel_case_words,
                                    replace_alpha_charater, to_lower)
from vsm.CalculateSimilarityMatrix import create_term_frequency_matrix

word_splitters = [".", "\n", "\t", " ", "(", ")", ":", ",",
                  ";", "[", "]", "{", "}", "\'", "\"", "|", "&", "*"]

highlight_colors = ["330C2F", "#7B287D", "#7067CF", "#B7C0EE", "#CBF3D2"]


def get_words_in_doc(doc: str):
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
                if new_word_index < last_item_index:
                    new_words.append(word_splitter)
        words = new_words.copy()
    return words


assert get_words_in_doc("dispatchQueueManager.getGroundStationId()") == [
    "dispatch", "Queue", "Manager", ".", "get", "Ground", "Station", "Id", "(", ")"]


def get_trace_information(dataset: str, source_type: str, source_id: str, target_type: str, target_id: str):
    source_artifact = get_artifact_in_dataset(
        dataset, source_type, source_id)["body"]
    target_artifact = get_artifact_in_dataset(
        dataset, target_type, target_id)["body"]

    source_words = get_words_in_doc(source_artifact)
    target_words = get_words_in_doc(target_artifact)
    all_words = source_words + target_words

    # TODO: Add stemming here
    stemmed_words = list(map(lambda word: word, all_words))

    wordRootMapping = {}
    for word_index, word in enumerate(all_words):
        wordRootMapping[word] = stemmed_words[word_index]

    source_cleaned = clean_doc(source_artifact)
    target_cleaned = clean_doc(target_artifact)

    vectorizer, source_term_weight_matrix, target_term_weight_matrix = create_term_frequency_matrix(
        [source_artifact], [target_artifact], True)  # TODO : replace with all artifacts for more accurate description

    summed_term_weight_matrix = (
        source_term_weight_matrix + target_term_weight_matrix)
    word_weight_mapping = create_word_weight_color_dictionary(
        vectorizer.vocabulary_, summed_term_weight_matrix.toarray(), highlight_colors)
    return {
        "sourceWords": source_words,
        "targetWords": target_words,
        "traceType": "MANUAL",
        "wordRootMapping": wordRootMapping,
        "score": 0.5,
        "wordWeightMapping": word_weight_mapping
    }


def create_word_weight_color_dictionary(word_mapping, weight_matrix, colors: [str], normalize=True, cutoff=0):
    scaled_matrix = minmax_scale(weight_matrix[0, :])

    result = {}
    for word, word_index in word_mapping.items():
        value = scaled_matrix[word_index]
        if value > cutoff:
            result[word] = {
                "weight": value
            }
    return result
