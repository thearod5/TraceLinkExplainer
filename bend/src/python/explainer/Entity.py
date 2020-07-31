class Entity:
    def __init__(self, entity_book):
        """

        :param words: a list of words which constitues the entity. The order of the words matters and one word could belong
        to at most one entity
        :param entity_book: a dictionary where key is word index, and value is entity. words in same entitiy in this
        dictionary should have same value
        :return:
        """
        self.__words = []
        self.entity_book = entity_book

    def update(self, words: list):
        """
        update the words in the content
        :return:
        """
        self.__words = words
        for wd in words:
            self.entity_book[wd.index] = self

    def add_word_sort_by_index(self, word):
        """
        Add a word to the entity and arrange the word by their index
        :param word:
        :return:
        """
        self.__words.append(word)
        self.__words = sorted(self.__words, key=lambda x: x.index)
        self.update(self.__words)

    def get_words(self):
        return list(self.__words)  # shallow copy

    def __repr__(self):
        return " ".join([wd.token for wd in self.__words])


class Word:
    def __init__(self, index, token, pos, lemma):
        self.index = index
        self.token = token
        self.pos = pos
        self.lemma = lemma

    def __str__(self):
        return "index={},token={},pos={},lemma={}".format(self.index, self.token, self.pos, self.lemma)

    def isNoun(self):
        return self.pos.startswith("NN")

    def isPRP(self):
        return self.pos.startswith("PRP")

    def isVerb(self):
        return self.pos.startswith("VB")
