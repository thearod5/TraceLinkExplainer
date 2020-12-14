import { getStepsInQuery } from './QueryStepParser'
import {
  AttributeType,
  AttributeTypeMap,
  ATTRIBUTE_VALUES,
  CATEGORICAL_OPERATIONS,
  COMBINATORS,
  CommandType,
  STEP_ORDER
} from './Types'

export function getQueryRecommendations (query: string) {
  let currentSteps
  try {
    currentSteps = getStepsInQuery(query)
  } catch (error) {
    return []
  }

  const currentStepInput = currentSteps[currentSteps.length - 1]
  const nextExpectedStepType: CommandType =
    STEP_ORDER[currentSteps.length % STEP_ORDER.length]
  switch (nextExpectedStepType) {
    case CommandType.ATTRIBUTE:
      return ATTRIBUTE_VALUES
    case CommandType.OPERATION:
      return getOperationRecommendations(currentStepInput)
    case CommandType.VALUE:
      return ['""'] // signals the words be wrapped in quotes
    case CommandType.COMBINATOR:
      return COMBINATORS
    default:
      throw Error('Unexpected step type: ' + nextExpectedStepType)
  }
}

export function getOperationRecommendations (attribute: string): string[] {
  if (ATTRIBUTE_VALUES.includes(attribute)) {
    const attributeType: AttributeType = AttributeTypeMap[attribute]
    switch (attributeType) {
      case AttributeType.categorical:
        return CATEGORICAL_OPERATIONS
      default:
        return []
    }
  }
  return []
}
