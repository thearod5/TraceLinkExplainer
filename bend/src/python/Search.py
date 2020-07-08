import pandas as pd

from CalculateSimilarityMatrix import calculate_similarity_matrix
from DataLoader import get_all_artifacts_for_dataset


"""
 Source - search_for_artifact
 Target - search_for_related_artifact
"""


def search_for_artifact(dataset: str, query: str, limit: int):
    artifacts = get_all_artifacts(dataset)
    if query == "":
        return create_default_search_items
    similarities = compare_target_to_artifacts(query, artifacts)
    return create_search_items(artifacts, similarities, limit)


def search_for_related_artifacts(
        dataset: str,
        target_type: str,
        target_id: str,
        query: str,
        limit: int):
    artifacts = get_all_artifacts(dataset)

    target_artifact_query = list(
        filter(lambda a: a["id"] == target_id, artifacts))

    assert len(
        target_artifact_query) == 1, "No artifact OR more than one artifact matching id: %s" % target_id

    target_artifact = target_artifact_query[0]["body"]
    other_artifacts = list(
        map(lambda a: a, filter(lambda a: a["id"] != target_id, artifacts)))

    similarities = compare_target_to_artifacts(
        target_artifact, other_artifacts)

    return create_search_items(artifacts, similarities, limit)


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
