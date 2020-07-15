import json

import pandas as pd

from CalculateSimilarityMatrix import calculate_similarity_matrix
from DataLoader import get_all_artifacts_for_dataset, get_traced_artifacts


"""
 Source - search_for_artifact
 Target - search_for_related_artifact
"""


def search_for_artifact(dataset: str, query: str, limit: int):
    artifacts = get_all_artifacts(dataset)
    if query == "":
        return create_default_search_items(artifacts, limit)
    similarities = compare_target_to_artifacts(query, artifacts)
    return create_search_items(artifacts, similarities, limit)


def search_for_related_artifacts(
        dataset: str,
        target_type: str,
        target_id: str,
        query: str,
        limit: int):

    traced_artifacts = get_traced_artifacts(dataset, target_type, target_id)
    if isinstance(traced_artifacts, dict) and "error" in traced_artifacts.keys():
        return traced_artifacts
    if query.strip() == "":
        default_items = create_default_search_items(traced_artifacts, limit)
        return default_items
    similarities = compare_target_to_artifacts(query, traced_artifacts)
    search_items = create_search_items(traced_artifacts, similarities, limit)

    return search_items


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
    return create_search_items(artifacts, pd.Series([0] * len(artifacts)), limit)


def create_search_items(artifacts, similarities, limit):
    searchItems = []
    for itemIndex in similarities.sort_values(ascending=False).index:
        searchItems.append(
            {
                "similarity": similarities[itemIndex],
                "artifact": artifacts[itemIndex]
            }
        )
    return {"searchItems": searchItems[:int(limit)]}
