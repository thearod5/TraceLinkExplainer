import { getOperationRecommendations } from "./QueryRecommender";
import { getStepsInQuery } from "./QueryStepParser";
import {
  Attributes,
  ATTRIBUTE_VALUES,
  COMBINATORS,
  CommandType,
  STEPS_IN_COMMAND_EXTENSION,
  STEPS_IN_SINGLE_COMMAND,
  STEP_ORDER,
} from "./Types";

const COMBINATOR_ERROR_HELP =
  'Note, multi-word values are expected to wrapped in quotation marks (e.g "[TEXT]")';
const MISSING_ATTRIBUTE_ERROR = `Missing Attribute to operate on. Attribute are: ${ATTRIBUTE_VALUES}`;

type isValidResponse = [boolean, string];

/*
 * Specific Command validations
 */

export function isValidAttibute(command: string): isValidResponse {
  const isValid = Attributes.some(
    (attribute) => attribute.fieldName.toLowerCase() === command.toLowerCase()
  );
  return [isValid, createQueryError(command, "Value", ATTRIBUTE_VALUES)];
}

export function isValidOperation(
  commands: string[],
  commandIndex: number
): isValidResponse {
  if (commandIndex === 0) return [false, MISSING_ATTRIBUTE_ERROR];
  const previousCommand = commands[commandIndex - 1];
  const command = commands[commandIndex];
  const validOperations = getOperationRecommendations(previousCommand);
  const isValid = validOperations.includes(command.toLowerCase());
  return [
    isValid,
    `Unknown operation: ${command}. Must be one of: ${validOperations}`,
  ];
}

export function isValidValue(command: string): isValidResponse {
  if (command.length === 0) return [false, "Value cannot be empty string."];
  if (command.includes('"'))
    return [false, "Value multi-space string could not be parsed."];

  return [true, ""];
}

export function isValidCombinator(command: string): isValidResponse {
  const isValid = COMBINATORS.includes(command.toLowerCase());
  return [
    isValid,
    createQueryError(command, "Combinator", COMBINATORS, COMBINATOR_ERROR_HELP),
  ];
}

/*
 * Validation
 */
export function isValidCommandStep(
  commands: string[],
  commandIndex: number
): isValidResponse {
  if (commandIndex >= commands.length)
    throw Error(`index out-of-bounds: ${commandIndex}`);

  const command = commands[commandIndex];
  let expectedStepType: CommandType =
    STEP_ORDER[commandIndex % STEP_ORDER.length];

  switch (expectedStepType) {
    case CommandType.ATTRIBUTE:
      return isValidAttibute(command);
    case CommandType.OPERATION:
      return isValidOperation(commands, commandIndex);
    case CommandType.VALUE:
      return isValidValue(command);
    case CommandType.COMBINATOR:
      return isValidCombinator(command);
    default:
      //unreachable but demanded by typescript
      throw Error(`Unimplemented step type: ${expectedStepType}`);
  }
}

export function isValidQuery(query: string): isValidResponse {
  let currentSteps;
  try {
    currentSteps = getStepsInQuery(query);
  } catch (error) {
    return [false, error.message];
  }

  if (currentSteps.length === 0) return [true, ""];

  for (let stepIndex = 0; stepIndex < currentSteps.length; stepIndex++) {
    let [isValid, error] = isValidCommandStep(currentSteps, stepIndex);
    if (!isValid) return [isValid, error];
  }
  const stepsBeforeExtensions =
    currentSteps.length % STEPS_IN_COMMAND_EXTENSION;
  const stepsRemaining = STEPS_IN_SINGLE_COMMAND - stepsBeforeExtensions;

  switch (stepsRemaining) {
    case 0:
      return [true, ""]; // single command completed
    case 1:
      return [false, "Missing value."];
    case 2:
      return [false, "Missing operation."];
    case 3:
      return [false, "Missing right term of combinator"];
    default:
      //unreachable but demanded by typescript
      throw Error(`Unexpected number of steps left: ${stepsRemaining}`);
  }
}

/*
 * Util
 */

function createQueryError(
  stepName: string,
  commandName: string,
  options: string[],
  suffix = ""
) {
  return `${stepName} is not a ${commandName}. It must be one of: ${options.join(
    ", "
  )}. ${suffix}`;
}
