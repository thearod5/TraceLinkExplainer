import json
import os
import pathlib

CURRENT_PATH = pathlib.Path().absolute()
PATH_TO_DATA = os.path.join(CURRENT_PATH, "..", "Data")


def get_dataset_path(dataset_name: str):
    dataset_query = list(
        filter(lambda f: f[0] != ".", os.listdir(PATH_TO_DATA)))
    assert dataset_name in dataset_query, 'Could not find dataset: %s' % dataset_name
    return os.path.join(PATH_TO_DATA, dataset_name)


def get_path_to_artifacts(dataset: str, artifact_type: str, hasExtension=False):
    path_to_dataset = get_dataset_path(dataset)
    artifact_type_query = list(
        filter(lambda f: f[0] != ".", os.listdir(path_to_dataset)))
    artifact_type_file_name = artifact_type + "" if hasExtension else ".json"
    assert artifact_type_file_name in artifact_type_query, "Could not find artifact set: %s" % artifact_type
    return os.path.join(path_to_dataset, artifact_type_file_name)


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
