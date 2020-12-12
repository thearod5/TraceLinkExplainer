import os
import pathlib
import sys
import unittest

from tests.api.TestSerialization import TestTraceSerializer

PATH_TO_TEST_FOLDER = pathlib.Path(__file__).parent.absolute()
PATH_TO_PYTHON_MODULE = os.path.join(PATH_TO_TEST_FOLDER, "..")
sys.path.insert(0, PATH_TO_PYTHON_MODULE)

# For Running from Command Line
from tests.explanation.TestConceptModel import TestConceptModel
from tests.explanation.TestRootFamilies import TestRootFamilies
from tests.explanation.TestUtil import TestUtil
from tests.explanation.TestQuery import TestQuery
from tests.explanation.TestSearch import TestSearch
from tests.explanation.TestCleanDoc import TestCleanDoc
import django

if __name__ == "__main__":

    # library setup
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "src.settings")
    django.setup()

    # test setup
    test_suite = unittest.TestSuite()

    classes_to_test = [
        TestSearch,
        TestQuery,
        TestCleanDoc,
        TestRootFamilies,
        TestConceptModel,
        TestUtil,
        TestTraceSerializer
    ]

    for c_to_test in classes_to_test:
        test_suite.addTest(c_to_test())

    # RUN
    runner = unittest.TextTestRunner()
    runner.run(test_suite)
