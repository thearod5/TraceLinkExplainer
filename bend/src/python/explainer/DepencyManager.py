import Entity
from Entity import Word


class DependencyMananger:
    """
    Dependency for convert corenlp dependency graph into a dictionary.
    Provide functions to retrieve dep based on given conditions.
    """

    def __init__(self, words, dep_graph):
        self.deps = []  # [deps]
        self.words = words
        for (w1, dep, w2) in dep_graph:
            sIndex = int(w1.index)
            tIndex = int(w2.index)
            if sIndex == 0 or tIndex == 0:
                continue
            ud = Dependency(sIndex, words[sIndex], tIndex, words[tIndex], dep)
            self.deps.append(ud)
        self.dep_source_index = self.index_deps_by_source()
        self.dep_target_index = self.index_deps_by_target()

    def index_deps_by_source(self):
        # Build index for dependency on the governer of depenedency
        dep_source_index = {}
        for ud in self.deps:
            tmp = dep_source_index.get(ud.sIndex, [])
            tmp.append(ud)
            dep_source_index[ud.sIndex] = tmp
        return dep_source_index

    def index_deps_by_target(self):
        # Build index for dependency on the governer of depenedency
        dep_source_index = {}
        for ud in self.deps:
            tmp = dep_source_index.get(ud.tIndex, [])
            tmp.append(ud)
            dep_source_index[ud.tIndex] = tmp
        return dep_source_index

    def get_dep_by_pos_start_with(self, deps, dep_type, spos, tpos):
        res = []
        for dep in deps:
            if dep.dep.startswith(dep_type):
                c1 = spos == None or self.words[dep.sIndex].pos.startswith(spos)
                c2 = tpos == None or self.words[dep.tIndex].pos.startswith(tpos)
                if c1 and c2:
                    res.append(dep)
        return res

    def get_dep_from_word(self, word: Word):
        # given word is the source
        return self.dep_source_index.get(word.index, [])

    def get_dep_from_ent(self, entity: Entity):
        res = []
        for wd in entity.get_words():
            res.extend(self.get_dep_from_word(wd))
        return res

    def get_dep_to_word(self, word: Word):
        # given word is the source
        return self.dep_target_index.get(word.index, [])

    def get_dep_to_ent(self, entity: Entity):
        res = []
        for wd in entity.get_words():
            res.extend(self.get_dep_to_word(wd))
        return res


class Dependency:
    def __init__(self, source, sToken, target, tToken, dep):
        self.sIndex = source
        self.sToken = sToken
        self.tIndex = target
        self.tToken = tToken
        self.dep = dep

    def __str__(self):
        return "source={}-{},  target={}-{},  dep={}".format(self.sIndex, self.sToken.token, self.tIndex,
                                                             self.tToken.token, self.dep)
