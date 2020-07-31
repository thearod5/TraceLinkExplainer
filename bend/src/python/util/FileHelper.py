import os


def path_contains_file(path, file_name):
    return file_name.lower() in map(lambda word: word.lower(), os.listdir(path))


def get_path_to_data(current_path: str):
    assert os.path.isdir(current_path), os.path.dirname(current_path)

    data_folder_name = "Data"
    path_to_data = current_path

    while not path_contains_file(path_to_data, data_folder_name):
        path_to_data = os.path.join(path_to_data, "..")
    return os.path.join(path_to_data, data_folder_name)