import functools

from nltk.stem import PorterStemmer

from Paths import PATH_TO_STOP_WORDS

ps = PorterStemmer()

stop_words = None
with open(PATH_TO_STOP_WORDS) as stop_word_file:
    stop_words = list(filter(lambda w: w != "", map(
        lambda w: w.lower(), stop_word_file.read().split("\n"))))
assert len(stop_words) > 0, "Could not load stop words file"


def split_chained_calls(line):
    return line.replace(".", " ").strip()


def get_camel_case_words(line):
    words = []
    start_index = 0
    i = 1

    for i in range(1, len(line) - 1):
        next_char = line[i + 1]
        current_char = line[i]
        previous_char = line[i - 1]

        # ex: helloWorld -> [hello, World]
        if current_char.isupper() and previous_char.islower() and previous_char != " ":
            words.append(line[start_index:i])
            start_index = i
        # ex: UAVDispatch -> [UAV, Dispatch]
        elif previous_char.isupper() and current_char.isupper() and next_char.islower():
            words.append(line[start_index:i])
            start_index = i

    if start_index < i:
        words.append(line[start_index:])
    return words


def separate_camel_case(doc: str):
    words = get_camel_case_words(doc)
    return " ".join(words)


def remove_stop_words(doc):
    word_tokens = doc.split(" ")
    filtered_sentence = [w for w in word_tokens if not w in stop_words]
    cleaned = " ".join(filtered_sentence)
    return cleaned


def remove_non_alphanumeric_characters(doc):
    def is_alpha_or_space(letter):
        return str.isalpha(letter) or str.isspace(letter)

    return ''.join(filter(is_alpha_or_space, doc))


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


CLEANING_PIPELINE = [
    split_chained_calls,
    # remaining non-alpha chars are not part of code
    remove_non_alphanumeric_characters,
    separate_camel_case,
    to_lower,
    remove_stop_words,
    stem_doc]


def clean_doc(doc, stop_at_index=None):
    pipeline = CLEANING_PIPELINE[:stop_at_index]
    return functools.reduce(lambda acc, value: value(acc), pipeline, doc)
