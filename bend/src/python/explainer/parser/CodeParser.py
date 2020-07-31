import re

import javalang
from javalang.tree import BasicType


class CodeParser:
    def __init__(self):
        pass

    def parse(self, code_content):
        raise NotImplementedError

    def get_variables(self):
        """
        Get all variable names
        :return:
        """
        raise NotImplementedError

    def get_comments(self):
        """
        Get comments as a list of sentences
        :return:
        """
        raise NotImplementedError

    def get_types(self):
        """
        Get all non-primative types from the code file
        :return:
        """
        raise NotImplementedError


class RegxParser(CodeParser):
    """
    Code parser using regular expression to extract context instead of using structure parsing.
    """
    pass


class JavaParser(CodeParser):

    def get_variables(self):
        return self.variables

    def get_comments(self):
        return self.comments

    def get_types(self):
        return self.types

    def __init__(self):
        super().__init__()
        self.comments = set()
        self.variables = set()
        self.types = set()

    def clean_doc(self, doc):
        if doc is None:
            return None
        if '@' in doc:
            i = 0
        doc = re.sub("[/*]+", "", doc)
        doc = re.sub("@author\s+[\w-]+\s+[\w-]+", "", doc)
        doc = re.sub("@version\s+[\w.]+", "", doc)
        doc = re.sub("@return\s+[\w.]+", "", doc)
        doc = re.sub("@param\s+[\w.]+", "", doc)
        doc = re.sub("<\w.>", "", doc)
        doc = re.sub("({@\w+\s+)([\w\s]+)(})", r" \2 ", doc)
        doc = re.sub("[\n]+", "\n", doc)
        doc = re.sub("[\s]+", " ", doc)
        return doc.strip("\n\t\r ")

    def reset(self):
        self.comments = set()
        self.variables = set()
        self.types = set()

    def parse(self, code_content):
        self.reset()
        code_content = code_content
        self.tree = javalang.parse.parse(code_content)
        self.class_info = []
        for path, node in self.tree.filter(javalang.tree.ClassDeclaration):
            self.class_info.append(node)
        for clas in self.class_info:
            class_doc = clas.documentation
            if class_doc is not None:
                self.comments.add(self.clean_doc(class_doc))
            for field in clas.fields:
                if not isinstance(field.type, BasicType):
                    type = field.type.name
                    self.types.add(type)
                    name = field.declarators[0].name
                    self.variables.add(name)

            for method in clas.methods:
                if method.documentation is not None:
                    method_doc = method.documentation
                    if method_doc is not None:
                        self.comments.add(self.clean_doc(method_doc))


if __name__ == "__main__":
    java_path = "../../Data/dronology_data/Dronology-DATASET_V001/edu.nd.dronology.monitoring.reminds/src/edu/nd/dronology/monitoring/reminds/RemindsConnector.java"
    with open(java_path) as fin:
        code = fin.read()
    jp = JavaParser()
    jp.parse(code)
    print("")
