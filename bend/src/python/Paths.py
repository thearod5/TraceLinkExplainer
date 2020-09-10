import os
import pathlib

PATH_TO_PYTHON_MODULE = pathlib.Path(__file__).parent.absolute()
PATH_TO_BEND = os.path.join(PATH_TO_PYTHON_MODULE, "..", "..")
PATH_TO_TEMP_FOLDER = os.path.join(PATH_TO_BEND, "temp")
PATH_TO_RESOURCES = os.path.join(PATH_TO_BEND, "resources")
PATH_TO_STOP_WORDS = os.path.join(PATH_TO_RESOURCES, "StopWords.txt")
