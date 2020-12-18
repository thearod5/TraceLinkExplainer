import { getOperationRecommendations } from './QueryRecommender'
import { getStepsInQuery } from './QueryStepParser'
import {
  Attributes,
  ATTRIBUTE_VALUES,
  COMBINATORS,
  CommandType,
  STEPS_IN_COMMAND_EXTENSION,
  STEPS_IN_SINGLE_COMMAND,
  STEP_ORDER
} from './Types'

const COMBINATOR_ERROR_HELP =
  'Note, multi-word values are expected to wrapped in quotation marks (e.g "[TEXT]")'
const MISSING_ATTRIBUTE_ERROR = `Missing Attribute to operate on. Attribute are: ${ATTRIBUTE_VALUES}`

type isValidResponse = [boolean, string];

/*
 * Specific Command validations
 */

export function isValidAttibute (symbol: string): isValidResponse {
  const isValid = Attributes.some(
    (attribute) => attribute.fieldName.toLowerCase() === symbol.toLowerCase()
  )
  return [isValid, createQueryError(symbol, 'Value', ATTRIBUTE_VALUES)]
}

export function isValidOperation (
  symbols: string[],
  symbolIndex: number
): isValidResponse {
  if (symbolIndex === 0) return [false, MISSING_ATTRIBUTE_ERROR]
  const previousCommand = symbols[symbolIndex - 1]
  const symbol = symbols[symbolIndex]
  const validOperations = getOperationRecommendations(previousCommand)
  const isValid = validOperations.includes(symbol.toLowerCase())
  return [
    isValid,
    `Unknown operation: ${symbol}. Must be one of: ${validOperations}`
  ]
}

export function isValidValue (symbol: string): isValidResponse {
  if (symbol.length === 0) return [false, 'Value cannot be empty string.']
  if (symbol.includes('"')) { return [false, 'Value multi-space string could not be parsed.'] }

  return [true, '']
}

export function isValidCombinator (symbol: string): isValidResponse {
  const isValid = COMBINATORS.includes(symbol.toLowerCase())
  return [
    isValid,
    createQueryError(symbol, 'Combinator', COMBINATORS, COMBINATOR_ERROR_HELP)
  ]
}

/*
 * Validation
 */
export function isValidCommandStep (
  symbols: string[],
  symbolIndex: number
): isValidResponse {
  if (symbolIndex >= symbols.length) { throw Error(`index out-of-bounds: ${symbolIndex}`) }

  const symbol = symbols[symbolIndex]
  const expectedStepType: CommandType =
    STEP_ORDER[symbolIndex % STEP_ORDER.length]

  switch (expectedStepType) {
    case CommandType.ATTRIBUTE:
      return isValidAttibute(symbol)
    case CommandType.OPERATION:
      return isValidOperation(symbols, symbolIndex)
    case CommandType.VALUE:
      return isValidValue(symbol)
    case CommandType.COMBINATOR:
      return isValidCombinator(symbol)
    default:
      // unreachable but demanded by typescript
      throw Error(`Unimplemented step type: ${expectedStepType}`)
  }
}

export function isValidQuery (query: string): isValidResponse {
  let currentSteps
  try {
    currentSteps = getStepsInQuery(query)
  } catch (error) {
    return [false, error.message]
  }

  if (currentSteps.length === 0) return [true, '']

  for (let stepIndex = 0; stepIndex < currentSteps.length; stepIndex++) {
    const [isValid, error] = isValidCommandStep(currentSteps, stepIndex)
    if (!isValid) return [isValid, error]
  }
  const stepsBeforeExtensions =
    currentSteps.length % STEPS_IN_COMMAND_EXTENSION
  const stepsRemaining = STEPS_IN_SINGLE_COMMAND - stepsBeforeExtensions

  switch (stepsRemaining) {
    case 0:
      return [true, ''] // single symbol completed
    case 1:
      return [false, 'Missing value.']
    case 2:
      return [false, 'Missing operation.']
    case 3:
      return [false, 'Missing right term of combinator']
    default:
      // unreachable but demanded by typescript
      throw Error(`Unexpected number of steps left: ${stepsRemaining}`)
  }
}

/*
 * Util
 */

function createQueryError (
  stepName: string,
  symbolName: string,
  options: string[],
  suffix = ''
) {
  return `${stepName} is not a ${symbolName}. It must be one of: ${options.join(
    ', '
  )}. ${suffix}`
}
