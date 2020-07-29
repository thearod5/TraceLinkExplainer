import json
import os
import pathlib

import pandas as pd
from nltk.stem import PorterStemmer

ps = PorterStemmer()

CURRENT_PATH = pathlib.Path().absolute()

# Dynamically search for data folder
PATH_TO_DATA = os.path.join(CURRENT_PATH, "..", "Data")
assert os.path.isdir(PATH_TO_DATA)

LINKED_MATRICES = {
    "Requirements": [("Level_1_to_Level_2.csv", 0), ("Level_1_to_Level_3.csv", 0)],
    "Designs": [("Level_1_to_Level_2.csv", 1), ("Level_2_to_Level_3.csv", 0)],
    "Classes": [("Level_1_to_Level_3.csv", 1), ("Level_2_to_Level_3.csv", 1)]
}
SOURCE_MATRICES = {
    "Level_1_to_Level_2.csv": {
        0: "Requirements",
        1: "Designs"
    },
    "Level_1_to_Level_3.csv": {
        0: "Requirements",
        1: "Classes"
    },
    "Level_2_to_Level_3.csv": {
        0: "Designs",
        1: "Classes"
    }
}

ARTIFACT_NOT_FOUND = "ARTIFACT_NOT_FOUND"


def get_dataset_path(dataset_name: str):
    dataset_query = list(
        filter(lambda f: f[0] != ".", os.listdir(PATH_TO_DATA)))
    assert dataset_name in dataset_query, 'Could not find dataset: %s' % dataset_name
    return os.path.join(PATH_TO_DATA, dataset_name)


def get_path_to_artifacts(dataset: str, artifact_type: str, hasExtension=False):
    path_to_dataset = get_dataset_path(dataset)
    artifact_type_query = list(
        filter(lambda f: f[0] != ".", os.listdir(path_to_dataset)))
    artifact_type_file_name = artifact_type + \
        "" if hasExtension else artifact_type + ".json"
    assert artifact_type_file_name in artifact_type_query, "Could not find artifact set: %s" % artifact_type
    return os.path.join(path_to_dataset, artifact_type_file_name)


def get_path_to_trace_matrices(dataset: str):
    path_to_dataset = get_dataset_path(dataset)
    assert "TraceMatrices" in os.listdir(
        path_to_dataset), "Cannot find trace matrices in %s" % dataset
    return os.path.join(path_to_dataset, "TraceMatrices")


def get_traced_artifacts(dataset: str, source_artifact_type: str, source_artifact_id: str):
    global_traced_artifacts = []
    path_to_trace_matrices = get_path_to_trace_matrices(dataset)
    linked_trace_matrices = LINKED_MATRICES[source_artifact_type]

    for trace_matrix_name, target_axis in linked_trace_matrices:
        # 1. Load paths
        source_axis = 1 - target_axis  # 1 - 0 = 1 | 1 - 1 = 0 (flips bit)
        source_artifact_type = SOURCE_MATRICES[trace_matrix_name][source_axis]
        path_to_linked_matrix = os.path.join(
            path_to_trace_matrices, trace_matrix_name)

        # 2. Find Traced Artifacts
        trace_matrices = pd.read_csv(path_to_linked_matrix).set_index("id")
        artifacts_in_type = get_dataset_artifacts_for_type(
            dataset, source_artifact_type)["artifacts"]

        # 3. Get traced artifacts ids
        search_id_list = trace_matrices.index if target_axis == 0 else trace_matrices.columns
        if source_artifact_id not in search_id_list:
            return create_error(ARTIFACT_NOT_FOUND, "Source artifact not found: %s" % source_artifact_id)
        query = trace_matrices.loc[source_artifact_id] if target_axis == 0 else trace_matrices[source_artifact_id]
        traced_artifact_ids = query[query == 1].index

        # 4. Load Traced Artifacts
        for traced_artifact_id in traced_artifact_ids:
            traced_artifacts = list(filter(
                lambda artifact: artifact["id"] == traced_artifact_id, artifacts_in_type))
            global_traced_artifacts = global_traced_artifacts + traced_artifacts

    return global_traced_artifacts


def create_error(id, message):
    return {
        "error": id,
        "message": message
    }


def get_dataset_artifacts_for_type(dataset: str, artifact_type: str, hasExtension=False):
    path_to_artifacts = get_path_to_artifacts(
        dataset, artifact_type, hasExtension=hasExtension)
    data = None
    with open(path_to_artifacts) as json_file:
        data = json.load(json_file)
    return data


def get_all_artifacts_for_dataset(dataset: str):
    path_to_dataset = get_dataset_path(dataset)
    artifact_types = list(
        filter(lambda f: f[0] != "." and ".json" in f, os.listdir(path_to_dataset)))
    return list(map(lambda a_type: get_dataset_artifacts_for_type(dataset, a_type, True), artifact_types))


def get_artifact_in_dataset(dataset: str, artifact_type: str, artifact_id: str):
    path_to_artifacts = get_path_to_artifacts(dataset, artifact_type)
    data = None
    with open(path_to_artifacts) as json_file:
        data = json.load(json_file)
    query = list(
        filter(lambda artifact: artifact["id"] == artifact_id, data["artifacts"]))
    assert len(
        query) == 1, "Expected a single match but found: %d matches" % len(query)
    return query[0]


def get_trace_information(dataset: str, source_type: str, source_id: str, target_type: str, target_id: str):
    source_artifact = get_artifact_in_dataset(dataset, source_type, source_id)
    target_artifact = get_artifact_in_dataset(dataset, target_type, target_id)

    all_words = source_artifact["body"].split(
        " ") + target_artifact["body"].split(" ")
    all_words = list(set(all_words))
    stemmed_words = list(map(ps.stem, all_words))
    wordRootMapping = {}
    for word_index, word in enumerate(all_words):
        wordRootMapping[word] = stemmed_words[word_index]
    return {
        "source": source_artifact,
        "target": target_artifact,
        "wordRootMapping": wordRootMapping
    }
