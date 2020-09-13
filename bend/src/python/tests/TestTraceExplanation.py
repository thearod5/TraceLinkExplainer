import unittest

from controllers.TraceExplanation import get_trace_information


class TestTraceExplanation(unittest.TestCase):

    def test_get_trace_information(self, ):
        trace_information = get_trace_information("Drone",
                                                  "Classes",
                                                  "AFAssignRouteComponent.java",
                                                  "Designs",
                                                  "DD-352")
        print(trace_information)
