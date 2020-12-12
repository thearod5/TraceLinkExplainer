import { Artifact, ArtifactDisplayModel } from '../types/Dataset'
import {
  KeyWordType, RelationshipColors,
  Relationships,
  SyntaxWordType,
  WordDescriptor, WordDescriptorDisplay,
  WordDescriptors,
  Words
} from '../types/Trace'

const syntaxDelimiters = ['{', '}', '(', ')', '[', ']']
const lineDelimiters = [' ', '\n', '\t'].concat(syntaxDelimiters)
const keyWordDelimiters = [
  'function',
  'public',
  'private',
  'protected',
  'final',
  'static',
  'package',
  'switch',
  'default',
  'import',
  'new',
  'class',
  'void',
  'try',
  'catch',
  'interface',
  'extends',
  'implements',
  'for',
  'if',
  'int',
  'double',
  'float',
  'string'
]

export function getDefaultRelationships (): Relationships {
  const families: Relationships = [
    {
      weight: 0,
      nodes: syntaxDelimiters.map(word => { return { word, nodeType: 'SIBLING' } }),
      title: SyntaxWordType
    }, {
      weight: 0,
      title: KeyWordType,
      nodes: keyWordDelimiters.map(word => { return { word, nodeType: 'SIBLING' } })
    }
  ]

  return families
}

export function getDefaultRelationshipColors (): RelationshipColors {
  const colors: RelationshipColors = {}
  colors[SyntaxWordType] = '#FF8C00'
  colors[KeyWordType] = '#79ADDC'
  colors[''] = 'black'
  return colors
}

export function createArtifactDisplayModel (
  artifact: Artifact,
  families: Relationships = getDefaultRelationships(),
  defaultSize: number = 1,
  relationshipColors: RelationshipColors = getDefaultRelationshipColors(),
  defaultColor: string = 'black'
): ArtifactDisplayModel {
  const wordDescriptors = createDefaultWordDescriptors(artifact.body)
  const words = createWords(
    wordDescriptors,
    families,
    defaultSize,
    relationshipColors,
    defaultColor
  )
  return {
    artifact,
    words
  }
}

/*
 * Default
 */

export function createDefaultWordDescriptors (body: string): WordDescriptors {
  return separateWords(body).map((bodyWord) => {
    return {
      relationshipIds: getWordFamilies(bodyWord),
      word: bodyWord
    }
  })
}

function getWordFamilies (word: string): string[] {
  if (syntaxDelimiters.includes(word)) return [SyntaxWordType]
  if (keyWordDelimiters.includes(word)) return [KeyWordType]
  else return []
}

/*
 * Custom Words
 */
export function createWords (
  descriptors: WordDescriptors,
  families: Relationships,
  defaultSize: number,
  relationshipColors: RelationshipColors,
  defaultColor: string = 'black'
): Words {
  const createWordFromDescriptor = (descriptor: WordDescriptor) =>
    createWord(
      descriptor,
      families,
      defaultSize,
      relationshipColors,
      defaultColor
    )
  return descriptors.map(createWordFromDescriptor)
}

export function createWord (
  descriptor: WordDescriptor,
  relationships: Relationships,
  defaultSize: number,
  relationshipColors: RelationshipColors,
  defaultColor: string
): WordDescriptorDisplay {
  const hasRelationship = descriptor.relationshipIds.length > 0
  let wordSize, wordColor
  if (hasRelationship) {
    const mainRelationshipId: string = descriptor.relationshipIds[0]
    const mainRelationshipQuery = relationships.filter(relationship => relationship.title === mainRelationshipId)

    if (mainRelationshipQuery.length === 0) { throw Error(`Could not find relationship: ${mainRelationshipId}`) }
    const mainRelationship = mainRelationshipQuery[0]

    wordSize = mainRelationship.weight + defaultSize
    wordColor =
      mainRelationshipId in relationshipColors
        ? relationshipColors[mainRelationshipId]
        : defaultColor
  } else {
    wordSize = defaultSize
    wordColor = defaultColor
  }

  return {
    word: descriptor.word,
    size: wordSize,
    color: wordColor,
    relationshipIds: descriptor.relationshipIds
  }
}

export function separateWords (body: string): string[] {
  let words: string[] = [body]

  for (
    let delimiterIndex = 0;
    delimiterIndex < lineDelimiters.length;
    delimiterIndex++
  ) {
    const delimiter = lineDelimiters[delimiterIndex]
    words = splitWordsByDelimiter(words, delimiter)
  }
  return words
}

export function splitWordsByDelimiter (
  words: string[],
  delimiter: string,
  addDelimiter = true
) {
  // Returns aggregated list of all words after each word is split
  const delimiterWords = []
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const wordChildren = words[wordIndex].split(delimiter)
    for (let childIndex = 0; childIndex < wordChildren.length; childIndex++) {
      const word = wordChildren[childIndex]
      if (word !== '') delimiterWords.push(word)
      if (childIndex < wordChildren.length - 1 && addDelimiter) { delimiterWords.push(delimiter) }
    }
  }
  return delimiterWords
}

export function getNodesInFamilies (relationships: Relationships) {
  const result = relationships.map(relationship => relationship.nodes.map(node => {
    return { id: node.word, label: node.word }
  })).flat()
  return result
}

export function getEdgesInFamilies (families: Relationships) {
  const edges: object[] = []
  for (let relationshipIndex = 0; relationshipIndex < families.length; relationshipIndex++) {
    const relationship = families[relationshipIndex]
    let from = relationship.nodes[0].word
    for (let edgeIndex = 0; edgeIndex < relationship.nodes.length; edgeIndex++) {
      const currentNode = relationship.nodes[edgeIndex]
      if (edgeIndex === 0) { continue }
      edges.push({
        from,
        to: currentNode.word,
        label: `is a ${titleCase(currentNode.nodeType)} of `
      })
      from = currentNode.nodeType === 'SIBLING' ? from : currentNode.word
    }
  }
  return edges
}

function titleCase (str: string) {
  var sentence = str.toLowerCase().split(' ')
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }
  return sentence
}
