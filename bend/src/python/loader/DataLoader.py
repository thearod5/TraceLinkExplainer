import json
import os
import pathlib

import pandas as pd

from util.FileHelper import get_path_to_data

CURRENT_PATH = pathlib.Path().absolute()

# Dynamically search for data folder
PATH_TO_DATA = get_path_to_data(CURRENT_PATH)
assert os.path.isdir(PATH_TO_DATA), PATH_TO_DATA

LINKED_MATRICES = {
    "requirements": [("Level_1_to_Level_2.csv", 0), ("Level_1_to_Level_3.csv", 0)],
    "designs": [("Level_1_to_Level_2.csv", 1), ("Level_2_to_Level_3.csv", 0)],
    "classes": [("Level_1_to_Level_3.csv", 1), ("Level_2_to_Level_3.csv", 1)]
}

SOURCE_MATRICES = {
    "Level_1_to_Level_2.csv": {
        0: "requirements",
        1: "designs"
    },
    "Level_1_to_Level_3.csv": {
        0: "requirements",
        1: "classes"
    },
    "Level_2_to_Level_3.csv": {
        0: "designs",
        1: "classes"
    }
}

ARTIFACT_NOT_FOUND_ERROR_TAG = "ARTIFACT_NOT_FOUND"


def get_dataset_path(dataset_name: str):
    dataset_query = list(
        filter(lambda f: f[0] != ".", os.listdir(PATH_TO_DATA)))
    assert dataset_name in dataset_query, 'Could not find dataset: %s in %s' % (
        dataset_name, PATH_TO_DATA)
    return os.path.join(PATH_TO_DATA, dataset_name)


def get_path_to_artifacts(dataset: str, artifact_type: str, has_extension=False):
    path_to_dataset = get_dataset_path(dataset)
    artifact_type_query = list(
        filter(lambda f: f[0] != ".", os.listdir(path_to_dataset)))
    artifact_type_file_name = artifact_type.lower() + \
                              "" if has_extension else artifact_type.lower() + ".json"
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
    linked_trace_matrices = LINKED_MATRICES[source_artifact_type.lower()]

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
            return create_error(ARTIFACT_NOT_FOUND_ERROR_TAG, "Source artifact not found: %s" % source_artifact_id)
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
        dataset, artifact_type, has_extension=hasExtension)
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
    artifacts = get_dataset_artifacts_for_type(dataset, artifact_type)
    query = list(
        filter(lambda artifact: artifact["id"] == artifact_id, artifacts["artifacts"]))
    assert len(
        query) == 1, "Expected a single match but found: %d matches" % len(query)
    return query[0]
