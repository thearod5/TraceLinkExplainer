# TODO: Remove
import os
import sys

update_files = sys.argv[1] == "--update" if len(sys.argv) > 1 else False

DIR_NAMES = {
    ".": "Root",
    "bend": "Back end",
    "fend": " Front end"
}


def install_npm_packages(dir_name: str):
    assert os.path.isdir(dir_name), "%s is not a directory." % dir_name
    os.system("cd %s && npm install" % dir_name)


def dir_does_not_contain(path_to_dir: str, target: str):
    return target not in os.listdir(path_to_dir)


def dir_does_not_contain_node_modules(path_to_dir: str):
    return dir_does_not_contain(path_to_dir, "node_modules")


def install_modules_if_missing(path_to_dir: str, installer):
    assert path_to_dir in DIR_NAMES.keys(), "Unknown directory: %s" % path_to_dir
    dir_name = DIR_NAMES[path_to_dir]
    action_name = "Installing" if dir_does_not_contain_node_modules(
        path_to_dir) else "Updating"
    print("%s %s" % (action_name, dir_name))
    installer()


"""
1. Install npm packages root
"""
install_modules_if_missing(".", lambda: os.system("npm install"))

"""
2. Install npm packages: fend
"""
install_modules_if_missing("fend", lambda: install_npm_packages("fend"))

"""
3. Install npm packages: bend
"""
install_modules_if_missing("bend", lambda: install_npm_packages("bend"))


"""
3. Create virtual Env
"""
if not os.path.isdir("./bend/env"):
    os.system("python3 -m venv bend/env")  # create new virtual env
else:
    print("Python virtual environment already installed.")

print("Updating virtual environment")
os.system("./bend/env/bin/pip3 install -r ./bend/requirements.txt")
"""
Running python from NodeJS messes up the system path causing error

PosixPath is not iterable

when importing the nltk library
  """

PATH_TO_DECORATOR = os.path.join(
    "bend", "env", "lib", "python3.7", "site-packages", "nltk", "decorators.py")

assert os.path.isfile(PATH_TO_DECORATOR), "Decoratory file not found"

target_string = "sys.path = [p for p in sys.path if p and \"nltk\" not in p]"
replacement_string = "# TODO: Remove this: sys.path = [p for p in sys.path if p and \"nltk\" not in p]"


def replace_line_in_file(path_to_file, target_string, replacement):
    with open(PATH_TO_DECORATOR, "r") as decorator_file:
        file_content = decorator_file.read()
    with open(PATH_TO_DECORATOR, "w+") as decorator_file:
        updated_file_content = file_content.replace(
            target_string, replacement_string)
        decorator_file.write(updated_file_content)


replace_line_in_file(PATH_TO_DECORATOR, target_string, replacement_string)
