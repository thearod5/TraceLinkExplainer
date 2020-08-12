from itertools import compress

import pandas as pd

combinators = {
    "and": lambda a, b: a and b,
    "or": lambda a, b: a or b
}

operations = {
    "is": lambda a, b: a == b,
    "contains": lambda a, b: b in a
}


def filter_artifacts(query: [str], artifacts):
    mask = create_query_mask(query, artifacts)
    return list(compress(artifacts, mask))


def create_query_mask(query: [str], artifacts, boolean_mask=None):
    """
    Creates the mask the applies the filter from the query
    """
    if boolean_mask is None:
        return create_query_mask(query, artifacts, pd.Series([True] * len(artifacts)))

    if len(query) == 0:
        return boolean_mask

    if len(query) < 3:
        raise Exception("Query must have attribute, operation, and value.")
    # combining commands
    combinator = query[0].lower()
    if combinator in combinators.keys():
        if len(query) < 4:
            raise Exception("combinator was given invalid right operand.")

        combinator_function = combinators[combinator]
        next_mask = create_query_mask(query[1:4], artifacts)
        next_boolean_mask = list(
            map(combinator_function, boolean_mask, next_mask))
        return create_query_mask(query[4:], artifacts, next_boolean_mask)

    # single command
    else:
        attribute, operation, value = query[:3]

        assert_artifact_contain_attribute(artifacts, attribute)

        def operation_filter(artifact):
            return operations[operation.lower()](
                artifact[attribute].lower(), value.lower())

        return create_query_mask(query[3:], artifacts, list(map(operation_filter, artifacts)))


def assert_artifact_contain_attribute(artifacts, attribute: str):
    artifact_missing_attribute = any(
        map(lambda artifact: attribute not in artifact, artifacts))
    if artifact_missing_attribute:
        raise Exception("Could not find attribute: " + attribute)


if __name__ == "__main__":
    print("Done!")
