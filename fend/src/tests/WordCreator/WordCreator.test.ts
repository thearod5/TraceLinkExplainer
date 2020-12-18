import {
    createDefaultWordDescriptors,
    splitWordsByDelimiter
} from '../../components/artifact/words/WordCreator'
import { KeyWordType, SyntaxWordType, WordDescriptor } from '../../types/Trace'

test('dummy test', () => {
  const document = 'function(int count)'
  const documentWords = ['function', '(', 'int', ' ', 'count', ')']
  const requiredRelationships = [SyntaxWordType, KeyWordType]

  // Body
  const words: WordDescriptor[] = createDefaultWordDescriptors(document)

  // Assertions
  const familiesInWords = []
  for (const wordIndex in words) {
    const word: WordDescriptor = words[wordIndex]

    expect(word.word).not.toStrictEqual('')
    expect(documentWords).toContain(word.word)
    for (const wordRelationshipIndex in word.relationshipIds) { familiesInWords.push(word.relationshipIds[wordRelationshipIndex]) }
  }

  for (const requiredRelationshipIndex in requiredRelationships) {
    expect(familiesInWords).toContain(requiredRelationships[requiredRelationshipIndex])
  }
})

test('+ : splitWordsByDelimiter : space', () => {
  const words = splitWordsByDelimiter(
    ['symbol body', 'hello world'],
    ' ',
    false
  )
  expect(words.length).toBe(4)
  expect(words[0]).toBe('symbol')
  expect(words[1]).toBe('body')
  expect(words[2]).toBe('hello')
  expect(words[3]).toBe('world')
})
