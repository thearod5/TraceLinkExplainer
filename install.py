# TODO: Remove
import os
import sys

update_files = sys.argv[1] == "--update" if len(sys.argv) > 1 else False

DIR_NAMES = {
    ".": "Root",
    "bend": "Back end",
    "fend": " Front end"
}


def install_packages(dir_name: str, install_command: str = 'npm install'):
    assert os.path.isdir(dir_name), "%s is not a directory." % dir_name
    os.system("cd %s && %s" % (dir_name, install_command))


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
install_modules_if_missing("fend", lambda: install_packages("fend"))

"""
3. Install npm packages: bend
"""
install_modules_if_missing("bend", lambda: install_packages("bend", "./install.sh"))
