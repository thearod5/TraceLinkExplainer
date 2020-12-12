from itertools import compress

import pandas as pd

from explanation.models.Artifact import ArtifactDict

COMBINE_FILTERS_OPERATIONS = {
    "&&": lambda a, b: a and b,
    "||": lambda a, b: a or b
}

FILTER_OPERATIONS = {
    "=": lambda a, b: a == b,
    "!=": lambda a, b: a != b,
    "~": lambda a, b: a in b,
    "!~": lambda a, b: a not in b,
    ">": lambda a, b: a > b,
    "<": lambda a, b: a < b
}


def filter_artifacts(query: [str], artifacts: [ArtifactDict]):
    mask = create_query_mask(query, artifacts)
    return list(compress(artifacts, mask))


def create_query_mask(query: [str], artifacts: [ArtifactDict], boolean_mask: [bool] = None) -> [bool]:
    """
    Creates the mask the applies the filter from the query
    """
    if boolean_mask is None:
        return create_query_mask(query, artifacts, pd.Series([True] * len(artifacts)))

    if len(query) == 0:
        return boolean_mask
    if len(query) < 3:
        raise Exception("Query must have attribute, operation, and value.")

    combinator = query[0].lower()
    if combinator not in COMBINE_FILTERS_OPERATIONS.keys():
        return create_filter_mask(query, artifacts)
    else:  # combinator is first item on recursive calls
        return combine_filter_masks(query, combinator, artifacts, boolean_mask)


def combine_filter_masks(query: str, combinator: str, artifacts: [ArtifactDict], boolean_mask: [bool]):
    if len(query) < 4:
        raise Exception("combinator was given invalid right operand.")

    combinator_function = COMBINE_FILTERS_OPERATIONS[combinator]
    next_mask = create_query_mask(query[1:4], artifacts)
    next_boolean_mask = list(
        map(combinator_function, boolean_mask, next_mask))
    return create_query_mask(query[4:], artifacts, next_boolean_mask)


def create_filter_mask(query: str, artifacts: [ArtifactDict]):
    attribute, operation, value = query[:3]
    assert_artifact_contain_attribute(artifacts, attribute)

    def operation_filter(artifact):
        operation_label = operation.lower()
        if operation_label not in FILTER_OPERATIONS.keys():
            raise Exception("Unknown filter operation: %s" % operation_label)

        return FILTER_OPERATIONS[operation.lower()](value.lower(), artifact[attribute].lower())

    return create_query_mask(query[3:], artifacts, list(map(operation_filter, artifacts)))


def assert_artifact_contain_attribute(artifacts, attribute: str):
    artifact_missing_attribute = any(
        map(lambda artifact: attribute not in artifact, artifacts))
    if artifact_missing_attribute:
        raise Exception("Could not find attribute: " + attribute)


if __name__ == "__main__":
    print("Done!")
