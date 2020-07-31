import re

import many_stop_words
import nltk, stanfordnlp
import warnings

from nltk.corpus import stopwords

from DepencyManager import DependencyMananger
from Entity import Word, Entity
from Rules import compoundRule

nlp = None


def init_nlp():
    """
    This function should be called before using the SWUM
    :return:
    """
    global nlp
    if not nlp:
        nlp = stanfordnlp.Pipeline(lang="en", processors='tokenize,lemma,pos,depparse')
        warnings.filterwarnings("ignore")


java_keywords = set([w.strip('*') for w in """
        abstract    continue    for     new     switch
        assert   default     goto*   package     synchronized
        boolean     do  if  private     this
        break   double  implements  protected   throw
        byte    else    import  public  throws
        case    enum****    instanceof  return  transient
        catch   extends     int     short   try
        char    final   interface   static  void
        class   finally     long    strictfp**  volatile
        const*  float   native  super   while string float int  
        vierhauser author michael org edu nd util collections java uav command
        net io core vehicle override null set jinghui
        """.split()])


def remove_stop_word(token_list):
    #stop_words = set(stopwords.words('english'))
    stop_words = many_stop_words.get_stop_words("en")
    stop_words.update(java_keywords)
    return [x for x in token_list if x.lower() not in stop_words]


class EntityPreprocessor():
    """
    process document with phrases instead of tokens
    """

    def __init__(self):
        pass

    def __clean_doc(self, doc_str):
        doc_str = re.sub("[^a-zA-Z0-9]", " ", doc_str, flags=re.UNICODE)
        return doc_str.strip("\n\t\r ")

    def split_camal_case(self, phrase):
        """
        Should not contain whitespace
        :param phrase: phrase in camalcase
        :return:
        """
        res = []
        for word in phrase.split():
            matches = re.finditer('.+?(?:(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|$)', word)
            res.extend([m.group(0) for m in matches])
        return res

    def corenlp_sent_init(self, corenlp_sent):
        words = {}  # id:word
        for word in corenlp_sent.words:
            wd = Word(int(word.index), word.text, word.pos, word.lemma)
            words[wd.index] = wd

        dep_graph = corenlp_sent.dependencies
        dep_manager = DependencyMananger(words, dep_graph)

        # init the entity book by adding every NN words as a inital entity
        noun_entity_book = {}
        for wd in words.values():
            if wd.isNoun() or wd.isPRP():
                e = Entity(noun_entity_book)
                e.update([wd])
        # init verb entity book
        verb_entity_book = {}
        for wd in words.values():
            if wd.isVerb():
                e = Entity(verb_entity_book)
                e.update([wd])
        return words, dep_manager, noun_entity_book, verb_entity_book

    def get_phrases(self, doc):
        global nlp
        phrases = list()
        # doc = self.__clean_doc(doc).lower()
        if len(doc) == 0:
            return phrases
        try:
            sents = nlp(doc).sentences
        except Exception as e:
            print(e)
            return phrases
        for sent in sents:
            words, dep_manager, noun_entity_book, verb_entity_book = self.corenlp_sent_init(sent)
            compoundRule(dep_manager, noun_entity_book)
            for w_i in words:
                if w_i in noun_entity_book and w_i - 1 in noun_entity_book and noun_entity_book[w_i] == \
                        noun_entity_book[w_i - 1]:
                    continue
                phrase_entity = noun_entity_book.get(w_i)
                if phrase_entity:
                    phrase = " ".join(self.split_camal_case(str(phrase_entity)))
                    phrases.append(phrase.lower())
                else:
                    token = self.__clean_doc(words[w_i].token)
                    if len(token) > 0:
                        phrases.append(token.lower())
        return phrases

    def get_tokens(self, doc):
        return self.get_phrases(doc)


class Preprocessor():
    def __init__(self):
        pass

    def get_stemmer(self, lang_code):
        "danish dutch english finnish french german hungarian italian norwegian porter portuguese romanian russian spanish swedish"
        if lang_code == "en":
            return nltk.SnowballStemmer("english")
        elif lang_code == "fr":
            return nltk.SnowballStemmer("french")
        elif lang_code == "ge":
            return nltk.SnowballStemmer("german")
        elif lang_code == 'it':
            return nltk.SnowballStemmer("italian")
        else:
            return nltk.SnowballStemmer("english")

    def clean_doc(self, doc_str):
        doc_str = re.sub("[^a-zA-Z0-9]", " ", doc_str, flags=re.UNICODE)
        doc_str = doc_str.strip("\n\r\t ")
        return doc_str

    def get_tokens(self, doc, language="en", split_camal_case=True):
        tokens = []
        doc = self.clean_doc(doc)
        res = nltk.word_tokenize(doc)
        for wd in res:
            tokens.extend(self.split_camal_case(wd))
        tokens = [x.lower() for x in tokens]
        return tokens

    def get_stemmed_tokens(self, doc_str, language="en"):
        en_stemmer = self.get_stemmer("en")
        fo_stemmer = self.get_stemmer(language)
        tokens = self.get_tokens(doc_str, language)
        tokens = [en_stemmer.stem(x) for x in tokens]
        tokens = [fo_stemmer.stem(x) for x in tokens]
        return tokens

    def split_camal_case(self, phrase):
        """
        Should not contain whitespace
        :param phrase: phrase in camalcase
        :return:
        """
        matches = re.finditer('.+?(?:(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|$)', phrase)
        return [m.group(0) for m in matches]


if __name__ == "__main__":
    init_nlp()
    test_str = "this is a sentence contains CamalCase word HTTP Request"
    pre = EntityPreprocessor()
    print(pre.get_phrases(test_str))
