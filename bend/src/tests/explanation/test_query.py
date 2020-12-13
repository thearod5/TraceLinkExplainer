from django.test import TestCase

from search.Query import filter_artifacts


class TestQuery(TestCase):
    test_artifact_body = "state transitiosn"

    def test_basic_filter(self):
        test_artifacts = [{"id": "RE-9", "body": self.test_artifact_body}]
        self.assertEqual(len(filter_artifacts([], test_artifacts)), 1)
        self.assertEqual(len(filter_artifacts(["id", "!=", "RE-9"], test_artifacts)), 0)
        self.assertEqual(len(filter_artifacts(["id", "=", "RE-9"], test_artifacts)), 1)

        self.assertEqual(0, len(filter_artifacts(["body", "~", "dob"], test_artifacts)))
        self.assertEqual(1, len(filter_artifacts(["body", "~", "state"], test_artifacts)))

    def test_exact_filter(self):
        self.assertEqual(len(filter_artifacts(["id", "=", "RE-8"], [{"id": "RE-9"}])), 0)

    def test_combined_filter(self):
        test_artifacts = [{"id": "RE-8", "body": self.test_artifact_body}]

        true_left = ["id", "=", "RE-8"]
        false_left = ["id", "=", "RE-9"]

        true_right = ["body", "~", "state"]
        false_right = ["body", "~", "pig"]

        # and
        self.assertEqual(len(filter_artifacts(true_left + ["&&"] + true_right, test_artifacts)), 1)
        self.assertEqual(len(filter_artifacts(true_left + ["&&"] + false_right, test_artifacts)), 0)
        self.assertEqual(len(filter_artifacts(false_left + ["&&"] + true_right, test_artifacts)), 0)
        self.assertEqual(len(filter_artifacts(false_left + ["&&"] + false_right, test_artifacts)), 0)

        # or
        self.assertEqual(len(filter_artifacts(true_left + ["||"] + true_right, test_artifacts)), 1)
        self.assertEqual(len(filter_artifacts(true_left + ["||"] + false_right, test_artifacts)), 1)
        self.assertEqual(len(filter_artifacts(false_left + ["||"] + true_right, test_artifacts)), 1)
        self.assertEqual(len(filter_artifacts(false_left + ["||"] + false_right, test_artifacts)), 0)

    def test_combine_negative(self):
        self.assertEqual(len(filter_artifacts(["id", "=", "RE-8", "&&", "type", "=", "Classes"],
                                              [{"id": "RE-8", "body": self.test_artifact_body,
                                                "type": "Requirements"}])),
                         0)
