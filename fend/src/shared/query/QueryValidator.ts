import { getOperationRecommendations } from "./QueryRecommender";
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
const UNDEFINED_PREVIOUS_STEP = "previous step not defined";
const MISSING_ATTRIBUTE_ERROR = `There is not attribute to operate on. Please prefix this with one of: ${ATTRIBUTE_VALUES}`;
type isValidResponse = [boolean, string];

/*
 * Validation
 */

export function isValidQuery(query: string): isValidResponse {
  const currentSteps: string[] = getStepsInQuery(query);
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
      return [false, "Missing operation and value."];
    default:
      throw Error("Unexpected # of steps remaining: " + stepsRemaining);
  }
}

export function isValidCommandStep(
  commands: string[],
  commandIndex: number
): isValidResponse {
  if (commandIndex >= commands.length)
    throw Error(`index out-of-bounds: ${commandIndex}`);

  const command = commands[commandIndex];
  const previousCommand =
    commandIndex === 0 ? undefined : commands[commandIndex - 1];
  let expectedStepType: CommandType =
    STEP_ORDER[commandIndex % STEP_ORDER.length];

  switch (expectedStepType) {
    case CommandType.ATTRIBUTE:
      return isValidAttibute(command);
    case CommandType.OPERATION:
      if (previousCommand === undefined)
        return [false, UNDEFINED_PREVIOUS_STEP];
      return isValidOperation(commands, commandIndex);
    case CommandType.VALUE:
      return isValidValue(command);
    case CommandType.COMBINATOR:
      return isValidCombinator(command);
    default:
      throw Error(`Unimplemented step type: ${expectedStepType}`);
  }
}

/*
 * Specific Command validations
 */

function isValidAttibute(command: string): isValidResponse {
  const isValid = Attributes.some(
    (attribute) => attribute.fieldName === command
  );
  return [isValid, createQueryError(command, "Value", ATTRIBUTE_VALUES)];
}

function isValidOperation(
  commands: string[],
  commandIndex: number
): isValidResponse {
  if (commandIndex == 0) return [false, MISSING_ATTRIBUTE_ERROR];
  const previousCommand = commands[commandIndex - 1];
  const command = commands[commandIndex];
  const validOperations = getOperationRecommendations(previousCommand);
  const isValid = validOperations.includes(command);
  return [isValid, createQueryError(command, "Operation", COMBINATORS)];
}

function isValidValue(command: string): isValidResponse {
  const isValidString = command.split('"').length >= 2;
  const isValidWord = !command.includes(" ");
  const isValid = isValidString || isValidWord;
  const errors = [isValidWord ? "" : "Word", isValidString ? "" : "String"];
  return [
    isValid,
    `Given word (${command}) not a valid: ${errors
      .filter((a) => a !== "")
      .join(", ")}`,
  ];
}

function isValidCombinator(command: string): isValidResponse {
  const isValid = COMBINATORS.includes(command);
  return [
    isValid,
    createQueryError(command, "Combinator", COMBINATORS, COMBINATOR_ERROR_HELP),
  ];
}

function createQueryError(
  stepName: string,
  commandName: string,
  options: string[],
  suffix = ""
) {
  return `${stepName} is a ${commandName} and must be one of: ${options.join(
    ", "
  )}. ${suffix}`;
}

export function getStepsInQuery(query: string) {
  return query.split(" ").filter((step) => step !== "");
}
