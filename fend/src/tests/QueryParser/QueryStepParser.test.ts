import { getStepsInQuery } from '../../operations/query/QueryStepParser'
/*
 * Step Parser
 */
test('+ : getStepsInQuery : empty : default', () => {
  const query = ''
  const steps = getStepsInQuery(query)
  expect(steps.length).toBe(0)
})

test('+ : getStepsInQuery : value : multiple', () => {
  const query = 'body ~ "hello world"'
  const steps = getStepsInQuery(query)
  expect(steps.length).toBe(3)
  expect(steps[0]).toBe('body')
  expect(steps[1]).toBe('~')
  expect(steps[2]).toBe('hello world')
})
test('+ : getStepsInQuery : value : single', () => {
  const query = 'id = "RE-8"'
  const steps = getStepsInQuery(query)
  expect(steps.length).toBe(3)
  expect(steps[0]).toBe('id')
  expect(steps[1]).toBe('=')
  expect(steps[2]).toBe('RE-8')
})

test('- : getStepsInQuery : too little quotes : single', () => {
  const query = 'id = "RE-8'
  expect(() => getStepsInQuery(query)).toThrowError('closing quote')
})
test('- : getStepsInQuery : too little quote : multi', () => {
  const query = 'id = "RE-8 a cool requirement'
  expect(() => getStepsInQuery(query)).toThrowError('closing quote')
})
test('- : getStepsInQuery : too many quotes : single', () => {
  const query = 'id = "RE-8""'
  expect(() => getStepsInQuery(query)).toThrowError('Too many quotes')
})
test('- : getStepsInQuery : too many quotes : multi', () => {
  const query = 'id = "RE-8 nope""'
  expect(() => getStepsInQuery(query)).toThrowError('Too many quotes')
})
