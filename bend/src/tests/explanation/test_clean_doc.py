from django.test import TestCase

from explanation.Cleaners import clean_doc, split_chained_calls, separate_camel_case, \
    remove_non_alphanumeric_characters, remove_stop_words, stem_doc, to_lower, get_camel_case_words, \
    get_words_in_string_doc


class TestCleanDoc(TestCase):

    def test_separate_chained_calls(self):
        doc = "helloWorld.thisMyThing"
        cleaned_doc = split_chained_calls(doc)
        self.assertEqual("helloWorld thisMyThing", cleaned_doc)

    def test_separate_camel_case_ec_example(self):
        doc = "GUIAnagraficaLaboratorioHandler"
        cleaned_doc = separate_camel_case(doc)
        self.assertEqual("GUI Anagrafica Laboratorio Handler", cleaned_doc)

    def test_separate_camel_case_none_found(self):
        doc = "hello world"
        cleaned_doc = separate_camel_case(doc)
        self.assertEqual(doc, cleaned_doc)

    def test_get_camel_case_words_with_acronym(self):
        words = get_camel_case_words("UAVDispatch")
        self.assertEqual(2, len(words))
        self.assertEqual("UAV", words[0])
        self.assertEqual("Dispatch", words[1])

    def test_get_camel_case_words_code(self):
        doc = "dispatchQueueManager.getGroundStationId()"
        words = get_camel_case_words(doc)
        self.assertEqual("dispatch", words[0])
        self.assertEqual("Queue", words[1])
        self.assertEqual("Manager.get", words[2])
        self.assertEqual("Ground", words[3])
        self.assertEqual("Station", words[4])
        self.assertEqual("Id()", words[5])

    def test_get_camel_case_words_single_acronym(self):
        doc = "UI"
        words = get_camel_case_words(doc)
        self.assertEqual(doc, words[0])

    def test_remove_non_alphanumeric(self):
        doc = "123helloWorld!.thisMyThing"
        cleaned_doc = remove_non_alphanumeric_characters(doc)
        self.assertEqual("helloWorldthisMyThing", cleaned_doc)

    def test_remove_stop_words(self):
        doc = "the cow jumped over the moon set move"
        cleaned_doc = remove_stop_words(doc)
        self.assertEqual("cow jumped moon", cleaned_doc)

    def test_to_lower(self):
        doc = "the COW jumPeD over MoOn"
        cleaned_doc = to_lower(doc)
        self.assertEqual("the cow jumped over moon", cleaned_doc)

    def test_stem_doc(self):
        doc = "the cow jumped over the moon"
        cleaned_doc = stem_doc(doc)
        self.assertEqual("the cow jump over the moon", cleaned_doc)

    def test_clean_doc_basic(self):
        doc = "123helloWorld!.thisMyThing"
        actual = clean_doc(doc)
        self.assertEqual("hello world thing", actual)

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

    def test_get_words_in_string_doc(self):
        words = get_words_in_string_doc("hello world")

        self.assertEqual("hello", words[0])
        self.assertEqual(" ", words[1])
        self.assertEqual("world", words[2])
