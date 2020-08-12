import unittest

from controllers.Query import filter_artifacts


class QueryTest(unittest.TestCase):

    def test_basic_filter(self):
        self.assertEqual(len(filter_artifacts([], [{"id": "RE-9"}])), 1)
        self.assertEqual(len(filter_artifacts(["id", "is", "RE-8"], [{"id": "RE-9"}])), 0)
        self.assertEqual(len(filter_artifacts(["id", "is", "RE-8"], [{"id": "RE-8"}])), 1)

        self.assertEqual(len(filter_artifacts(["body", "contains", "state"], [{"body": "dog"}])), 0)
        self.assertEqual(len(filter_artifacts(["body", "contains", "state"], [{"body": "state transitions"}])), 1)

    def test_exact_filter(self):
        self.assertEqual(len(filter_artifacts(["id", "IS", "RE-8"], [{"id": "RE-9"}])), 0)

    def test_combined_filter(self):
        test_artifacts = [{"id": "RE-8", "body": "state transitions"}]

        true_left = ["id", "is", "RE-8"]
        false_left = ["id", "is", "RE-9"]

        true_right = ["body", "contains", "state"]
        false_right = ["body", "contains", "pig"]

        # and
        self.assertEqual(len(filter_artifacts(true_left + ["and"] + true_right, test_artifacts)), 1)
        self.assertEqual(len(filter_artifacts(true_left + ["and"] + false_right, test_artifacts)), 0)
        self.assertEqual(len(filter_artifacts(false_left + ["and"] + true_right, test_artifacts)), 0)
        self.assertEqual(len(filter_artifacts(false_left + ["and"] + false_right, test_artifacts)), 0)

        # or
        self.assertEqual(len(filter_artifacts(true_left + ["or"] + true_right, test_artifacts)), 1)
        self.assertEqual(len(filter_artifacts(true_left + ["or"] + false_right, test_artifacts)), 1)
        self.assertEqual(len(filter_artifacts(false_left + ["or"] + true_right, test_artifacts)), 1)
        self.assertEqual(len(filter_artifacts(false_left + ["or"] + false_right, test_artifacts)), 0)

    def test_combine_negative(self):
        self.assertEqual(len(filter_artifacts(["id", "is", "RE-8", "and", "type", "is", "Classes"],
                                              [{"id": "RE-8", "body": "state transitions", "type": "Requirements"}])),
                         0)
