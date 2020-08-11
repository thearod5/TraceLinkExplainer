enum StepType {
  ATTRIBUTE = 0,
  OPERATION = 1,
  VALUE = 2,
  COMBINATOR = 3,
}

const STEP_ORDER: StepType[] = [
  StepType.ATTRIBUTE,
  StepType.OPERATION,
  StepType.VALUE,
  StepType.COMBINATOR,
];

enum AttributeType {
  categorical = 0,
}

const AttributeTypeMap: Record<string, AttributeType> = {
  type: AttributeType.categorical,
  body: AttributeType.categorical,
  id: AttributeType.categorical,
};

export const AttributeValues = ["type", "body", "id"];
export const CategoricalOperations = [
  "contains",
  "does not contain",
  "is",
  "is not",
];
const Combinators = ["AND", "NOT", "ORDER BY"];
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
    let res = isValidStep(currentStep, stepIndex, previousStep);
    if (!res[0]) return res;
  }
  return [true, ""];
}

const UNDEFINED_PREVIOUS_STEP = "previous step not defined";
type isValidResponse = [boolean, string];

export function isValidStep(
  step: string,
  index: number,
  previousStep?: string
): isValidResponse {
  const UNDEFINED_PREVIOUS_STEP = "previous step not defined";

  let expectedStepType: StepType = STEP_ORDER[index % STEP_ORDER.length];
  switch (expectedStepType) {
    case StepType.ATTRIBUTE:
      return isValidAttibute(step);
    case StepType.OPERATION:
      if (previousStep === undefined) return [false, UNDEFINED_PREVIOUS_STEP];
      return isValidOperation(previousStep, step);
    case StepType.VALUE:
      return isValidValue(step);
    case StepType.COMBINATOR:
      return isValidCombinator(step);
    default:
      throw Error(`Unimplemented step type: ${expectedStepType}`);
  }
}

function isValidAttibute(queryStepValue: string): isValidResponse {
  const isValid = AttributeValues.includes(queryStepValue.toLowerCase());
  return [isValid, `Attributes must be one of: ${AttributeValues.join(", ")}`];
}

function isValidOperation(
  attribute: string,
  operation: string
): isValidResponse {
  const validOperations = getOperationRecommendations(attribute);
  const isValid = validOperations.includes(operation);
  return [isValid, `Operations must be one of:  ${validOperations.join(", ")}`];
}

export function isValidValue(value: string): isValidResponse {
  const isValidString = value.split('"').length >= 2;
  const isValidWord = !value.includes(" ");
  const isValid = isValidString || isValidWord;
  const errors = [isValidWord ? "" : "Word", isValidString ? "" : "String"];
  return [
    isValid,
    `Given word (${value}) not a valid: ${errors
      .filter((a) => a !== "")
      .join(",")}`,
  ];
}

const COMBINATOR_ERROR_HELP =
  'Note, multi-word values are expected to wrapped in quotation marks (e.g "[TEXT]")';

function isValidCombinator(step: string): isValidResponse {
  const isValid = Combinators.includes(step);
  return [
    isValid,
    `Combinators must be one of: ${Combinators.join(
      ", "
    )}. ${COMBINATOR_ERROR_HELP}`,
  ];
}

/*
 * Recommendations
 */
export function getQueryRecommendations(query: string) {
  const currentSteps = getStepsInQuery(query);
  const currentStepInput = currentSteps[currentSteps.length - 1];
  const nextExpectedStepType: StepType =
    STEP_ORDER[currentSteps.length % STEP_ORDER.length];
  switch (nextExpectedStepType) {
    case StepType.ATTRIBUTE:
      return AttributeValues;
    case StepType.OPERATION:
      return getOperationRecommendations(currentStepInput);
    case StepType.VALUE:
      return ['""']; //signals the words be wrapped in quotes
    case StepType.COMBINATOR:
      return Combinators;
    default:
      throw Error("Unexpected step type: " + nextExpectedStepType);
  }
}

function getOperationRecommendations(attribute: string): string[] {
  if (AttributeValues.includes(attribute)) {
    const attributeType: AttributeType = AttributeTypeMap[attribute];
    switch (attributeType) {
      case AttributeType.categorical:
        return CategoricalOperations;
      default:
        return [];
    }
  }
  return [];
}

function getStepsInQuery(query: string) {
  return query.split(" ").filter((step) => step !== "");
}
