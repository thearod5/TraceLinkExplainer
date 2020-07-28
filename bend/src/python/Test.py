
def test(keys, values):
    result = {}
    for key_index, key in enumerate(keys):
        result[key] = values[key_index]
    return result
