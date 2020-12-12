from django.test import TestCase

from explanation.controllers.Search import search_for_artifact, search_for_related_artifacts


class TestSearch(TestCase):

    def test_search_source(self):
        artifacts = search_for_artifact(
            "Drone", ["id", "=", "RE-8"], 10)["searchItems"]

        self.assertEqual(1, len(artifacts))
        self.assertEqual(artifacts[0]["id"], "RE-8")

    def test_empty_search(self):
        artifacts = search_for_artifact("Drone", [], 10)["searchItems"]
        self.assertEqual(10, len(artifacts))

    def test_search_for_related_artifacts(self):
        response = search_for_related_artifacts("Drone",
                                                [{'id': "RE-8", "type": "requirements"}],
                                                "",
                                                -1)
        traced_artifacts = response["searchItems"]
        self.assertEqual(7, len(traced_artifacts))

    def test_search_for_related_artifacts_with_duplicates(self):
        response = search_for_related_artifacts("Drone",
                                                [{'id': "RE-8", "type": "requirements"},
                                                 {'id': "RE-8", "type": "requirements"}],
                                                "",
                                                -1)
        traced_artifacts = response["searchItems"]
        self.assertEqual(7, len(traced_artifacts))


def get_ids(artifacts):
    return list(map(lambda a: a["id"], artifacts))
