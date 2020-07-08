
import importlib
import json
import os
import pathlib
import sys

import numpy as np
import pandas as pd

PATH_TO_MODULES = pathlib.Path(__file__).parent.absolute()
sys.path.insert(0, PATH_TO_MODULES)


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

"""
3. Call Method
"""

dictResult = method_to_call(*function_arguments)
dataToSendBack = json.dumps(dictResult)


"""
2. Export Data
"""
print(dataToSendBack)
sys.stdout.flush()
