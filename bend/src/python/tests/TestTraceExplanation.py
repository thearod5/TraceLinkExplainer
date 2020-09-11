import unittest

from controllers.TraceExplanation import get_words_in_string_doc, create_root_weight_mapping, get_trace_information


class TestTraceExplanation(unittest.TestCase):

    def test_get_trace_information(self, ):
        trace_information = get_trace_information("Drone",
                                                  "Classes",
                                                  "AFAssignRouteComponent.java",
                                                  "Designs",
                                                  "DD-113")
        families = trace_information["families"]
        print(families)

    def test_get_words_in_string_doc(self):
        words = get_words_in_string_doc("hello world")

        self.assertEqual("hello", words[0])
        self.assertEqual(" ", words[1])
        self.assertEqual("world", words[2])

    def test_get_words_in_string_doc_code(self):
        doc = "dispatchQueueManager.getGroundStationId()"
        words = get_words_in_string_doc(doc)
        self.assertEqual("dispatch", words[0])
        self.assertEqual("Queue", words[1])
        self.assertEqual("Manager", words[2])
        self.assertEqual(".", words[3])
        self.assertEqual("get", words[4])
        self.assertEqual("Ground", words[5])
        self.assertEqual("Station", words[6])
        self.assertEqual("Id", words[7])
        self.assertEqual("(", words[8])
        self.assertEqual(")", words[9])
    
    def test_create_root_weight_mapping(self):
        a_words = ["UAV", "state"]
        b_words = ["UAV", "transition"]
        result = create_root_weight_mapping(a_words, b_words, -1)
        print(result)
        self.assertEqual(0, result["state"]["weight"])
        self.assertEqual(0, result["state"]["transition"])
        self.assertEqual(1, round(result["uav"]['weight'], 2))
