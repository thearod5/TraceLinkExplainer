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

const AttributeValues = ["type", "body", "id"];
const CATEGORICAL_OPERATIONS = ["contains", "does not contain", "is", "is not"];
const COMBINATORS = ["AND", "NOT", "ORDER BY"];
/*
 * Validation
 */

export function isValidQuery(query: string) {
  const currentSteps = getStepsInQuery(query);
  if (currentSteps.length === 0) return true;

  for (let stepIndex = 0; stepIndex < currentSteps.length; stepIndex++) {
    let currentStep = currentSteps[stepIndex];
    if (stepIndex === 0) {
      if (!isValidStep(currentStep, stepIndex)) return false;
    } else {
      let previousStep = currentSteps[stepIndex - 1];
      return isValidStep(currentStep, stepIndex, previousStep);
    }
  }
  return true;
}

function isValidStep(step: string, index: number, previousStep?: string) {
  if (index !== 0 && previousStep === undefined) return false;

  let expectedStepType: StepType = STEP_ORDER[index % STEP_ORDER.length];
  switch (expectedStepType) {
    case StepType.ATTRIBUTE:
      return isValidAttibute(step);
    case StepType.OPERATION:
      if (previousStep === undefined) return false;
      return isValidOperation(previousStep, step);
    case StepType.VALUE:
      if (previousStep === undefined) return false;
      return isValidOperation(previousStep, step);
    case StepType.COMBINATOR:
      return isValidCombinator(step);
    default:
      return false;
  }
}

function isValidAttibute(queryStepValue: string) {
  return ["type", "id", "body"].includes(queryStepValue.toLowerCase());
}

function isValidOperation(attribute: string, operation: string) {
  const validOperations = getOperationRecommendations(attribute);
  return validOperations.includes(operation);
}

function isValidCombinator(step: string) {
  return COMBINATORS.includes(step);
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
      return [];
    case StepType.COMBINATOR:
      return COMBINATORS;
    default:
      throw Error("Unexpected step type: " + nextExpectedStepType);
  }
}

function getOperationRecommendations(attribute: string): string[] {
  if (AttributeValues.includes(attribute)) {
    const attributeType: AttributeType = AttributeTypeMap[attribute];
    switch (attributeType) {
      case AttributeType.categorical:
        return CATEGORICAL_OPERATIONS;
      default:
        return [];
    }
  }
  return [];
}

function getStepsInQuery(query: string) {
  return query.split(" ").filter((step) => step !== "");
}
