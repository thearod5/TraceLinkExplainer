import { RootState } from "..";
import { Artifact, Dataset } from "../../../../shared/Dataset";
import {
  HOME_ROUTE,
  SELECT_ARTIFACTS_ROUTE,
  TRACE_VIEW_ROUTE,
} from "../../components/nav/routes";
import { isArtifact, isDataset } from "../../util/TypeUtil";
import { initializeEmptyMetaData } from "../initializers";
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
const TARGET_NOT_SELECTED_ERROR = "You must select a target artifact.";

export const PAGE_STEP_MAPPING: Record<number, string> = {
  0: HOME_ROUTE,
  1: SELECT_ARTIFACTS_ROUTE,
  2: SELECT_ARTIFACTS_ROUTE,
  3: TRACE_VIEW_ROUTE,
};

//write unit tests for state
export function getNewStepState(
  currentState: RootState,
  requestedStep: number,
  stepPayload: StepPayload
): RootState | string {
  //Step step if an error is found
  const error = getStepChangeError(currentState, requestedStep, stepPayload); //validation
  if (error !== undefined) return error;

  //All Code assumes valid step change.
  const currentMetaData = currentState.metaData;
  const emptyMetaData = initializeEmptyMetaData();
  switch (requestedStep) {
    case SELECT_DATASET_STEP:
      return {
        dataset: currentState.dataset,
        metaData: initializeEmptyMetaData(),
      };
    case SELECT_SOURCE_STEP:
      const requiredDataset: Dataset = isDataset(stepPayload)
        ? stepPayload
        : currentState.dataset;
      return {
        ...currentState,
        dataset: requiredDataset,
        metaData: {
          ...emptyMetaData,
          currentStep: requestedStep,
          oldStep: currentMetaData.currentStep,
        },
      };

    case SELECT_TARGET_STEP:
      const requiredSource = isArtifact(stepPayload)
        ? stepPayload
        : currentState.metaData.sourceArtifact;
      return {
        ...currentState,
        metaData: {
          ...currentMetaData,
          currentStep: requestedStep,
          oldStep: currentMetaData.currentStep,
          sourceArtifact: requiredSource,
        },
      };

    case VIEW_TRACE_STEP:
      const requiredTarget = isArtifact(stepPayload)
        ? stepPayload
        : currentState.metaData.targetArtifact;
      return {
        ...currentState,
        metaData: {
          ...currentMetaData,
          currentStep: requestedStep,
          oldStep: currentMetaData.currentStep,
          targetArtifact: requiredTarget,
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
      else if (!sourceSelected && requestedStep > SELECT_SOURCE_STEP)
        return SOURCE_NOT_SELECTED_ERROR;
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
