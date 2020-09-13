def create_dictionary_from_values(source: dict, keys: [str], values: [str]):
    """
    Returns a dict with keys being the values of `keys` and values being the values of `values`.
    """
    assert len(keys) == len(values), values
    for key_index, key in enumerate(keys):
        source[key] = values[key_index]
    return source


def export_object_as_dict(obj):
    if type(obj) == dict:
        new_object = {}
        for key, value in obj.items():
            new_object[key] = export_object_as_dict(value)
        return new_object
    if not hasattr(obj, "__dict__"):
        return obj
    result = {}
    for key, val in obj.__dict__.items():
        if key.startswith("_"):
            continue
        element = []
        if isinstance(val, list):
            for item in val:
                element.append(export_object_as_dict(item))
        else:
            element = export_object_as_dict(val)
        result[key] = element
    return result


def list_as_dict(objects):
    return list(map(lambda o: o.__dict__, objects))
