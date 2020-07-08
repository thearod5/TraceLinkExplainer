import functools

import nltk

nltk.download()

# nltk.download()
# import PorterStemmer


# ps = PorterStemmer()


# def clean_doc(doc, stop_at_index=None):
#     pipeline = [split_chained_calls, separate_camel_case, filter_alpha_characters,
#                 to_lower, remove_stop_words, stem_doc][:stop_at_index]
#     return functools.reduce(lambda acc, value: value(acc), pipeline, doc)


# def split_chained_calls(line):
#     return line.replace(".", " ").strip()


# def separate_camel_case(line):
#     """
#     theCowJumpedOverTheMoon -> the Cow Jumped Over The Moon
#     :param line: containing words in camel case
#     :return: {String} given string with camel case words separated
#     """
#     result = ""
#     for i in range(0, len(line)):
#         char = line[i]
#         if char.isupper() and i != 0 and line[i - 1] != " " and not line[i - 1].isupper():
#             result = result + " "
#         result = result + char
#     return result.strip()


# def remove_stop_words(doc):
#     stop_words = set(stopwords.words('english'))
#     word_tokens = word_tokenize(doc)
#     filtered_sentence = [w for w in word_tokens if not w in stop_words]
#     return " ".join(filtered_sentence)


# def filter_alpha_characters(doc):
#     def is_alpha_or_space(letter):
#         return str.isalpha(letter) or str.isspace(letter)

#     return ''.join(filter(is_alpha_or_space, doc))


# def to_lower(doc):
#     return " ".join(map(lambda word: word.lower(), doc.split(" ")))


# def stem_doc(doc):
#     """
#     Removes numbers, newlines, parenthesis, stems words, and makes them all lower case
#     :param doc: {String} The uncleaned string.
#     :return: {String} Cleaned string.
#     """
#     if doc is None:
#         raise Exception("Received None as text document")
#     return " ".join([ps.stem(word) for word in doc.split(" ")])
