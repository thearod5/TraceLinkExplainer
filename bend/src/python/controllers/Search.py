import pandas as pd

from controllers.Query import filter_artifacts
from loader.DataLoader import (get_all_artifacts_for_dataset,
                               get_traced_artifacts)
from relationships.vsm.CalculateSimilarityMatrix import calculate_similarity_matrix

"""
 Source - search_for_artifact
 Target - search_for_related_artifact
"""


def search_for_artifact(dataset: str, query: [str], limit: int):
    artifacts = get_all_artifacts(dataset)

    if query == "" or len(query) == 0:
        return create_default_search_items(artifacts, limit)
    else:
        return create_search_response(filter_artifacts(query, artifacts), limit)


def search_for_related_artifacts(
        dataset: str,
        sources: [dict],
        query: str,
        limit: int):
    traced_artifacts = []
    for source in sources:
        target_type = source["type"]
        target_id = source["id"]
        source_traced_artifacts = get_traced_artifacts(dataset, target_type, target_id)
        if isinstance(source_traced_artifacts, dict):
            continue
        else:
            traced_artifacts = traced_artifacts + source_traced_artifacts

    traced_artifacts = remove_duplicates(traced_artifacts)
    if isinstance(traced_artifacts, dict) and "error" in traced_artifacts.keys():
        return traced_artifacts
    if query.strip() == "":
        default_items = create_default_search_items(traced_artifacts, limit)
        return default_items
    return create_search_response(traced_artifacts, limit)


def remove_duplicates(l: dict):
    return [dict(t) for t in {tuple(d.items()) for d in l}]


"""
 HELPER FUNCTIONS
"""


def compare_target_to_artifacts(target: str, other_artifacts: [str]):
    similarity_matrix = calculate_similarity_matrix(
        [target], map(lambda o_a: o_a["body"], other_artifacts))
    similarities = pd.Series(similarity_matrix[0, :])
    return similarities


def get_all_artifacts(dataset: str):
    all_artifacts = get_all_artifacts_for_dataset(dataset)
    nested_artifacts = list(
        map(lambda artifact_json: artifact_json["artifacts"], all_artifacts))
    artifacts = [item for sublist in nested_artifacts for item in sublist]
    return artifacts


def create_default_search_items(artifacts, limit: int):
    sorted_artifacts = sorted(artifacts, key=lambda i: (
        i['type'], i['id']), reverse=False)
    return create_search_response(sorted_artifacts, limit)


def create_sorted_response(artifacts, similarities, limit: int):
    searchItems = []
    limit = None if limit == -1 else limit
    for itemIndex in similarities.sort_values(ascending=False).index:
        searchItems.append(artifacts[itemIndex])
    return create_search_response(searchItems, limit)


def create_search_response(artifacts, limit):
    limit = None if limit == -1 else limit
    return {"searchItems": artifacts[:limit]}
