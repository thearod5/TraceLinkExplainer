import DepencyManager
import Entity
from Entity import Word


def compoundRule(dep_manager: DepencyManager, entity_book: dict):
    #  compund(NN1,NN2): use compound to connect NNs
    compound_dep = dep_manager.get_dep_by_pos_start_with(dep_manager.deps, "compound", "NN", "NN")
    for dp in compound_dep:
        sEnt = entity_book[dp.sIndex]
        tEnt = entity_book[dp.tIndex]
        wds = []
        wds.extend(sEnt.get_words())
        wds.extend(tEnt.get_words())
        wds = sorted(wds, key=lambda x: x.index)
        sEnt.update(wds)
        tEnt.update(wds)


def amodRule(dep_manager, entity_book, words: dict):
    # amod(NN,*) :find adv and adj for a noun
    # nummod(NN,*) find num mod for a noun
    deps = []
    amod_dep = dep_manager.get_dep_by_pos_start_with(dep_manager.deps, "amod", "NN", None)
    nummod_dep = dep_manager.get_dep_by_pos_start_with(dep_manager.deps, "nummod", "NN", "CD")
    deps.extend(amod_dep)
    deps.extend(nummod_dep)
    for dp in deps:
        adj = words[dp.tIndex]
        ent = entity_book[dp.sIndex]  # only the source can be included in a entity
        wds = ent.get_words()
        wds.insert(0, adj)
        wds = sorted(wds, key=lambda x: x.index)
        ent.update(wds)


def nmodBetweenNounRule(pset, dep_manger: DepencyManager, entity_book, words: dict):
    nmod_dep = dep_manger.get_dep_by_pos_start_with(dep_manger.deps, "nmod", "NN", "NN")
    for dp in nmod_dep:
        sn = words[dp.sIndex]
        tn = words[dp.tIndex]
        nmod_info = dp.dep.split(":")
        if len(nmod_info) != 2:
            return
        verb = nmod_info[1]
        verb = " ".join(verb.split("_"))
        pset.append((str(entity_book[sn.index]), verb, str(entity_book[tn.index])))


def nsubRule(vb_ent: Entity, dep_manager: DepencyManager, words: dict):
    # get nsubj for given vb_ent

    vb_ent_dep = dep_manager.get_dep_from_ent(vb_ent)
    nsub_dep = dep_manager.get_dep_by_pos_start_with(vb_ent_dep, "nsubj", None, None)
    if len(nsub_dep) == 0:
        return None
    else:
        return words[nsub_dep[0].tIndex]


def aclRule(vb_ent: Entity, dep_manager: DepencyManager, words: dict):
    # acl(NN,VB) to find subj alternatives
    vb_dep = dep_manager.get_dep_to_ent(vb_ent)
    acl_dep = dep_manager.get_dep_by_pos_start_with(vb_dep, "acl", "NN", "VB")
    if len(acl_dep) != 1:
        return None
    else:
        return words[acl_dep[0].sIndex]


def dobjRule(vb: Entity, dep_manager: DepencyManager, words: dict):
    # find dobj
    vb_dep = dep_manager.get_dep_from_ent(vb)
    dobj_deps = dep_manager.get_dep_by_pos_start_with(vb_dep, "dobj", "VB", "NN")
    return [words[x.tIndex] for x in dobj_deps]


def nmodAsDobj(vb_ent: Entity, dep_manager: DepencyManager, words: dict) -> Word:
    """When Dobj is missing use nmod dep to find NN as dobj"""
    vb_dep = dep_manager.get_dep_from_ent(vb_ent)
    nmod_dep = dep_manager.get_dep_by_pos_start_with(vb_dep, "nmod", None, "NN")
    if len(nmod_dep) > 0:
        dep = nmod_dep[0]
        nmod_info = dep.dep.split(":")
        if len(nmod_info) > 1:
            targetNN = words[dep.tIndex]
            targetNN_deps = dep_manager.get_dep_from_word(targetNN)
            case_deps = dep_manager.get_dep_by_pos_start_with(targetNN_deps, "case", "NN", None)
            if len(case_deps) > 0:
                case_dep = case_deps[0]
                prep_word = words[case_dep.tIndex]
                vb_ent.add_word_sort_by_index(prep_word)
        return words[dep.tIndex]


def nmodAsVerb(vb_ent: Entity, dep_manager: DepencyManager, words: dict) -> tuple:
    """When nmod carry an extra preposition and the verb have an dobj already, get extra relationships from the dep by
    leveraging the nmod:prepostion as verb
    """
    vb_dep = dep_manager.get_dep_from_ent(vb_ent)
    nmod_dep = dep_manager.get_dep_by_pos_start_with(vb_dep, "nmod", "VB", "NN")
    if len(nmod_dep) > 0:
        dep = nmod_dep[0]
        preposition_index = dep.dep.index(":") + 1
        if preposition_index > 0:
            preposition = dep.dep[preposition_index:]
        else:
            preposition = "to"  # use "to" as default
        return (preposition, words[dep.tIndex])


def nmodRule(vb: Word, dep_manager: DepencyManager, words: dict, dobj):
    """
    nmod rule between verb and noun
    :param vb:
    :param dep_manager:
    :param words:
    :param dobj:
    :return:
    """
    vb_dep = dep_manager.get_dep_from_word(vb)
    nmod_dep = dep_manager.get_dep_by_pos_start_with(vb_dep, "nmod", "VB", "NN")
    if len(nmod_dep) > 0:
        dep = nmod_dep[0]
        if dobj is None:
            return (None, words[dep.tIndex])
        else:
            preposition_index = dep.dep.index(":") + 1
            if preposition_index > 0:
                preposition = dep.dep[preposition_index:]
            else:
                preposition = "to"  # use "to" as default
            return (preposition, words[dep.tIndex])


def vbModifierRule(dep_manager, words, verb_entity_book):
    vb_modifyer_dep = dep_manager.get_dep_by_pos_start_with(dep_manager.deps, "advmod", "VB", None)
    vb_modifyer_dep.extend(dep_manager.get_dep_by_pos_start_with(dep_manager.deps, "neg", "VB", None))

    for dp in vb_modifyer_dep:
        sEnt = verb_entity_book[dp.sIndex]
        wds = []
        wds.extend(sEnt.get_words())
        wds.append(words[dp.tIndex])
        wds = sorted(wds, key=lambda x: x.index)
        sEnt.update(wds)


def copRule(dep_manager, words, verb_entity_book):
    """
    use cop rule to bound adj into verb entity.e.g be unassigned
    :return:
    """
    cop_deps = dep_manager.get_dep_by_pos_start_with(dep_manager.deps, "cop", None, "VB")
    for dp in cop_deps:
        tEnt = verb_entity_book[dp.tIndex]
        wds = []
        wds.extend(tEnt.get_words())
        wds.append(words[dp.sIndex])
        wds = sorted(wds, key=lambda x: x.index)
        tEnt.update(wds)


def auxpassRule(dep_manager, words, verb_entity_book):
    auxpass_deps = dep_manager.get_dep_by_pos_start_with(dep_manager.deps, "auxpass", "VB", "VB")
    for dp in auxpass_deps:
        sEnt = verb_entity_book[dp.sIndex]
        tEnt = verb_entity_book[dp.tIndex]
        wds = []
        wds.extend(sEnt.get_words())
        wds.extend(tEnt.get_words())
        wds = sorted(wds, key=lambda x: x.index)
        tEnt.update(wds)
        sEnt.update(wds)


def NNConjRule(pset, words, dep_manager, entity_book):
    nn_conj_deps = dep_manager.get_dep_by_pos_start_with(dep_manager.deps, "conj", "NN", "NN")
    for dp in nn_conj_deps:
        sEnt = entity_book[dp.sIndex]
        tEnt = entity_book[dp.tIndex]
        if sEnt == tEnt:
            continue
        sRels = []
        tRels = []
        for rel in pset:
            if str(sEnt) == rel[0] or str(sEnt) == rel[2]:
                sRels.append(rel)
            elif str(tEnt) == rel[0] or str(tEnt) == rel[2]:
                tRels.append(rel)
        pset.extend(copy_pset_for_NN(sEnt, tEnt, sRels))
        pset.extend(copy_pset_for_NN(tEnt, sEnt, tRels))


def cleanPset(pset):
    pset = [p for p in pset if p[0] != "?" or p[2] != "?"]
    return pset


def advclRule(vb_ent: Entity, dep_manager, words, verb_entity_book):
    vb_dep = dep_manager.get_dep_to_ent(vb_ent)
    # advcl_dep = dep_manager.get_dep_by_pos_start_with(vb_dep, "advcl", "VB", "VB")
    advcl_dep = dep_manager.get_dep_by_pos_start_with(vb_dep, "advcl", None, "VB")
    if len(advcl_dep) > 1:
        print("Multiple advcl dep for entity {}".format(str(vb_ent)))
        return None
    elif len(advcl_dep) == 0:
        return None
    target_vb = words[advcl_dep[0].sIndex]
    if target_vb.index not in verb_entity_book:
        return None
    return nsubRule(verb_entity_book[target_vb.index], dep_manager, words)


def copy_pset_for_NN(e1, e2, rels):
    res = []
    for rel in rels:
        if str(e1) == rel[0]:
            res.append((str(e2), rel[1], rel[2]))
        elif str(e1) == rel[2]:
            res.append((rel[0], rel[1], str(e2)))
    return res
