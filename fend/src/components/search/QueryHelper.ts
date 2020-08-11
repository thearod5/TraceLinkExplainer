import { getOperationRecommendations } from "./QueryRecommender";

export const ATTRIBUTE_VALUES = ["type", "body", "id"];
export const CATEGORICAL_OPERATIONS = [
  "contains",
  "does not contain",
  "is",
  "is not",
];
export const COMBINATORS = ["AND", "NOT", "ORDER BY"];

export enum CommandType {
  ATTRIBUTE = 0,
  OPERATION = 1,
  VALUE = 2,
  COMBINATOR = 3,
}

export enum AttributeType {
  categorical = 0,
}

export const STEP_ORDER: CommandType[] = [
  CommandType.ATTRIBUTE,
  CommandType.OPERATION,
  CommandType.VALUE,
  CommandType.COMBINATOR,
];

export const AttributeTypeMap: Record<string, AttributeType> = {
  type: AttributeType.categorical,
  body: AttributeType.categorical,
  id: AttributeType.categorical,
};

const COMBINATOR_ERROR_HELP =
  'Note, multi-word values are expected to wrapped in quotation marks (e.g "[TEXT]")';
const UNDEFINED_PREVIOUS_STEP = "previous step not defined";
type isValidResponse = [boolean, string];

/*
 * Validation
 */

export function isValidQuery(query: string): isValidResponse {
  const currentSteps = getStepsInQuery(query);
  if (currentSteps.length === 0) return [true, ""];

  for (let stepIndex = 0; stepIndex < currentSteps.length; stepIndex++) {
    let currentStep = currentSteps[stepIndex];
    let previousStep =
      stepIndex === 0 ? undefined : currentSteps[stepIndex - 1];
    let res = isValidCommand(currentStep, stepIndex, previousStep);
    if (!res[0]) return res;
  }
  return [true, ""];
}

export function isValidCommand(
  command: string,
  commandIndex: number,
  previousCommand?: string
): isValidResponse {
  let expectedStepType: CommandType =
    STEP_ORDER[commandIndex % STEP_ORDER.length];
  switch (expectedStepType) {
    case CommandType.ATTRIBUTE:
      return isValidAttibute(command);
    case CommandType.OPERATION:
      if (previousCommand === undefined)
        return [false, UNDEFINED_PREVIOUS_STEP];
      return isValidOperation(previousCommand, command);
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
  const isValid = ATTRIBUTE_VALUES.includes(command.toLowerCase());
  return [isValid, createQueryError(command, "Value", ATTRIBUTE_VALUES)];
}

function isValidOperation(
  previousCommand: string,
  command: string
): isValidResponse {
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
