import { Artifact, Dataset } from "../../../shared/Dataset";
import {
  HOME_ROUTE,
  SELECT_ARTIFACTS_ROUTE,
  TRACE_VIEW_ROUTE,
} from "../components/nav/routes";
import { RootState } from "../redux";
import { isArtifact, isDataset } from "../util/TypeUtil";
import {
  SELECT_DATASET_STEP,
  SELECT_SOURCE_STEP,
  SELECT_TARGET_STEP,
  VIEW_TRACE_STEP,
} from "./constants";

type StepPayload = Dataset | Artifact | undefined;

const DATASET_NOT_SELECTED_ERROR =
  "You must select a dataset before proceeding.";
const SOURCE_NOT_SELECTED_ERROR = "You must select a source artifact.";
const TARGET_NOT_SELECTED_ERROR = "You must select a target articact.";

export const PAGE_STEP_MAPPING: Record<number, string> = {
  0: HOME_ROUTE,
  1: SELECT_ARTIFACTS_ROUTE,
  2: SELECT_ARTIFACTS_ROUTE,
  3: TRACE_VIEW_ROUTE,
};

function createStepError(type: string, step: number) {
  return `Expected ${type} to complete step # ${step}`;
}

export function getNewStepState(
  currentState: RootState,
  requestedStep: number,
  stepPayload: StepPayload
): RootState | string {
  const error = getStepChangeError(currentState, requestedStep, stepPayload);
  if (error !== undefined) return error;

  const oldMetaData = currentState.metaData;
  switch (requestedStep) {
    case SELECT_SOURCE_STEP:
      if (isDataset(stepPayload)) {
        return {
          ...currentState,
          dataset: stepPayload,
          metaData: {
            ...oldMetaData,
            currentStep: requestedStep,
            oldStep: oldMetaData.currentStep,
          },
        };
      } else throw Error(createStepError("dataset", SELECT_DATASET_STEP));
    case SELECT_TARGET_STEP:
      if (isArtifact(stepPayload)) {
        return {
          ...currentState,
          metaData: {
            ...oldMetaData,
            currentStep: requestedStep,
            oldStep: oldMetaData.currentStep,
            sourceArtifact: stepPayload,
          },
        };
      } else throw Error(createStepError("artifact", SELECT_SOURCE_STEP));

    case VIEW_TRACE_STEP:
      if (isArtifact(stepPayload)) {
        return {
          ...currentState,
          metaData: {
            ...oldMetaData,
            currentStep: requestedStep,
            oldStep: oldMetaData.currentStep,
            targetArtifact: stepPayload,
          },
        };
      } else throw Error(createStepError("artifact", SELECT_TARGET_STEP));

    case VIEW_TRACE_STEP:
      return {
        ...currentState,
        metaData: {
          ...oldMetaData,
          currentStep: requestedStep,
          oldStep: oldMetaData.currentStep,
        },
      };
    default:
      throw Error("Unknown Step: " + requestedStep);
  }
}

export function getStepChangeError(
  state: RootState,
  requestedStep: number,
  payload: StepPayload
): string | undefined {
  const requestedEndpoint = PAGE_STEP_MAPPING[requestedStep];
  const datasetSelected = isDataset(payload) || state.dataset.name !== "";
  const sourceSelected =
    isArtifact(payload) || state.metaData.sourceArtifact.id !== "";
  const targetSelected =
    isArtifact(payload) && state.metaData.sourceArtifact.id !== "";

  switch (requestedEndpoint) {
    case HOME_ROUTE:
      return undefined;
    case SELECT_ARTIFACTS_ROUTE:
      if (!datasetSelected) return DATASET_NOT_SELECTED_ERROR;
      else return undefined;
    case TRACE_VIEW_ROUTE:
      if (!datasetSelected) return DATASET_NOT_SELECTED_ERROR;
      else if (!sourceSelected) return SOURCE_NOT_SELECTED_ERROR;
      else if (!targetSelected) return TARGET_NOT_SELECTED_ERROR;
      else return undefined;

    default:
      return undefined;
  }
}
