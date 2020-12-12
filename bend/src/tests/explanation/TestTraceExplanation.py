import unittest

from explanation.controllers.TraceExplanation import get_trace_information
from explanation.models.TraceInformation import TracePayloadDict


class TestTraceExplanation(unittest.TestCase):

    def test_get_trace_information(self, ):
        trace_information: TracePayloadDict = get_trace_information("test",
                                                                    "Classes",
                                                                    "AFAssignRouteComponent.java",
                                                                    "Designs",
                                                                    "DD-352")
        print(trace_information)
