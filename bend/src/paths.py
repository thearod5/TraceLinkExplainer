import os
import pathlib

PATH_TO_PYTHON_MODULE = pathlib.Path(__file__).parent.absolute()
PATH_TO_ROOT = os.path.join(PATH_TO_PYTHON_MODULE, "..", "..", )
PATH_TO_BEND = os.path.join(PATH_TO_ROOT, "bend")
PATH_TO_DATA = os.path.join(PATH_TO_ROOT, "Data")
PATH_TO_RESOURCES = os.path.join(PATH_TO_ROOT, "resources")
PATH_TO_STOP_WORDS = os.path.join(PATH_TO_RESOURCES, "StopWords.txt")
PATH_TO_TEST_PROJECT_RESOURCES = os.path.join(PATH_TO_BEND, "src", "tests", "res", "testproject")
