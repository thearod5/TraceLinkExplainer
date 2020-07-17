
import importlib
import json
import os
import pathlib
import sys
import time
import traceback

import numpy as np
import pandas as pd

PATH_TO_PYTHON_MODULE = pathlib.Path(__file__).parent.absolute()
PATH_TO_TEMP_FOLDER = os.path.join(PATH_TO_PYTHON_MODULE, "..", "temp")

sys.path.insert(0, PATH_TO_PYTHON_MODULE)


def import_module(file_name):
    module_name = file_name.split(".")[0]  # removes .py
    return importlib.import_module(module_name)


"""
1. Read Class, Function, and Function Arguments
"""

class_name = sys.argv[1]
function_name = sys.argv[2]
function_arguments = sys.argv[3:]


custom_module = import_module(class_name)
method_to_call = getattr(custom_module, function_name)

PYTHON_INTERNAL_EXPORT_ERROR = "PYTHON_INTERNAL_EXPORT_ERROR"
GENERAL_INTERNAL_ERROR = "PYTHON_GENERAL_ERROR_INTERNAL"
ASSERTION_ERROR = "ASSERTION_ERROR"
TYPE_ERROR = "TYPE_ERROR"

try:
    """
    3. Call Method
    """
    dictResult = method_to_call(*function_arguments)
    assert isinstance(
        dictResult, dict), "Expected function result to be dictionary. %s" % repr(method_to_call)

    """
    4. Create temp file identifier
    """
    time_stamp = time.time()
    temp_file_name = repr(time_stamp) + ".json"
    path_to_temp_file = os.path.join(PATH_TO_TEMP_FOLDER, temp_file_name)
except AssertionError as error:
    dictResult = {
        "error": ASSERTION_ERROR,
        "message": str(error)
    }
except TypeError as error:
    dictResult = {
        "error": TYPE_ERROR,
        "message": str(traceback.format_exc())
    }
except:
    dictResult = {
        "error": GENERAL_INTERNAL_ERROR,
        "message": str(traceback.format_exc())
    }

"""
2. Export Temp File Path
"""


try:
    with open(path_to_temp_file, 'w') as outfile:
        json.dump(dictResult, outfile)
    print(path_to_temp_file)
    sys.stdout.flush()
except:
    export_error = {
        "error": PYTHON_INTERNAL_EXPORT_ERROR,
        "message": str(traceback.format_exc())
    }
    print(json.dumps(export_error, indent=2))
    sys.stdout.flush()
