import functools

# import nltk
# from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# from nltk.tokenize import word_tokenize

ps = PorterStemmer()


def clean_doc(doc, stop_at_index=None):
    pipeline = [split_chained_calls, separate_camel_case, filter_alpha_characters,
                to_lower][:stop_at_index]  # TODO: Remove to activate stemming, remove_stop_words, stem_doc][:stop_at_index]
    return functools.reduce(lambda acc, value: value(acc), pipeline, doc)


def split_chained_calls(line):
    return line.replace(".", " ").strip()


def separate_camel_case(line):
    """
    theCowJumpedOverTheMoon -> the Cow Jumped Over The Moon
    :param line: containing words in camel case
    :return: {String} given string with camel case words separated
    """
    result = ""
    for i in range(0, len(line)):
        char = line[i]
        if char.isupper() and i != 0 and line[i - 1] != " " and not line[i - 1].isupper():
            result = result + " "
        result = result + char
    return result.strip()


def get_camel_case_words(line):
    words = []
    start_index = 0
    for i in range(0, len(line)):
        current_char = line[i]
        if i != 0 and current_char.isupper() and not line[i - 1].isupper() and line[i - 1] != " ":
            words.append(line[start_index:i])
            start_index = i
    if start_index != i:
        words.append(line[start_index: i+1])
    return words


def is_alpha_or_space(letter):
    return str.isalpha(letter) or str.isspace(letter)


def replace_alpha_charater(doc, replacement):
    return "".join(list(map(lambda letter: letter if is_alpha_or_space(letter) else replacement, doc)))


def filter_alpha_characters(doc):
    return ''.join(filter(is_alpha_or_space, doc))


# def remove_stop_words(doc):
#     stop_words = set(stopwords.words('english'))
#     word_tokens = word_tokenize(doc)
#     filtered_sentence = [w for w in word_tokens if not w in stop_words]
#     return " ".join(filtered_sentence)


# assert remove_stop_words("the") == ""


def to_lower(doc):
    return " ".join(map(lambda word: word.lower(), doc.split(" ")))


def stem_doc(doc):
    """
    Removes numbers, newlines, parenthesis, stems words, and makes them all lower case
    :param doc: {String} The uncleaned string.
    :return: {String} Cleaned string.
    """
    if doc is None:
        raise Exception("Received None as text document")
    return " ".join([ps.stem(word) for word in doc.split(" ")])


assert stem_doc("Manager") == "manag"
