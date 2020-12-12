import inspect
import os

import django
from django.test import TestCase

run_long_tests = False


class SmartTest(TestCase):
    """
    implements a generic runTest that subclasses use to run all tests
    """

    def runTest(self):
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "src.settings")
        django.setup()

        tests_names = [key for key, _ in inspect.getmembers(self) if "test_" in key]
        for test_name in tests_names:
            if "_long" == test_name[-5:]:
                if run_long_tests:
                    getattr(self, test_name)()
            else:
                getattr(self, test_name)()
