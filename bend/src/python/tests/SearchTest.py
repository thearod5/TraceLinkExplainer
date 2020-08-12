import unittest

from controllers.Search import search_for_artifact


class SearchTest(unittest.TestCase):
    def test_search_source(self):
        artifacts = search_for_artifact("Drone", ["id", "is", "RE-8"], 10)["searchItems"]

        self.assertEqual(1, len(artifacts))
        self.assertEqual(artifacts[0]["id"], "RE-8")

    def test_empty_search(self):
        artifacts = search_for_artifact("Drone", [], 10)["searchItems"]
        self.assertEqual(10, len(artifacts))
