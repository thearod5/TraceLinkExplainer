from django.test import TestCase

from search.Attributes import NameAttribute, TypeAttribute


class TestAttributes(TestCase):
    def test_equality(self):
        self.assertEqual(NameAttribute(), NameAttribute())
        self.assertNotEqual(NameAttribute(), TypeAttribute())
