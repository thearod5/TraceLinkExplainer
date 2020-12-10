import importlib
import json
import os
import pathlib
import sys
import time
import traceback

from Paths import PATH_TO_TEMP_FOLDER, PATH_TO_PYTHON_MODULE

PYTHON_INTERNAL_EXPORT_ERROR = "PYTHON_INTERNAL_EXPORT_ERROR"
GENERAL_INTERNAL_ERROR = "PYTHON_GENERAL_ERROR_INTERNAL"
ASSERTION_ERROR = "ASSERTION_ERROR"
TYPE_ERROR = "TYPE_ERROR"

sys.path.insert(0, PATH_TO_PYTHON_MODULE)


def import_module(file_name):
    module_name = file_name.replace(".py", "")
    return importlib.import_module(module_name)


def runTest(controller_name: str):
    class_name = ".".join(["tests", controller_name])

    # Import
    custom_module = import_module(class_name)
    method_to_call = getattr(custom_module, "runTest")
    method_to_call()


def runFunction(controller_name: str, function_name: str, function_arguments_str_object: str):
    class_name = ".".join(["controllers", controller_name])

    # Parse json object and extract or arguments
    function_arguments_object = json.loads(function_arguments_str_object)
    function_arguments = function_arguments_object["arguments"]

    custom_module = import_module(class_name)
    method_to_call = getattr(custom_module, function_name)

    time_stamp = time.time()
    temp_file_name = repr(time_stamp) + ".json"
    path_to_temp_file = os.path.join(PATH_TO_TEMP_FOLDER, temp_file_name)

    try:
        """
        3. Call Method
        """
        dictResult = method_to_call(*function_arguments)

        if isTest:
            exit()
        assert isinstance(
            dictResult, dict), "Expected function result to be dictionary. %s" % repr(method_to_call)

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


"""
Expecting: [ControllerName], [FunctionName], [FunctionArgs]
"""

controller_name = sys.argv[1]
function_name = sys.argv[2]

isTest = controller_name.lower() == "test"
if isTest:
    runTest(function_name)
else:
    function_arguments_str_object = sys.argv[3]
    runFunction(controller_name, function_name, function_arguments_str_object)
