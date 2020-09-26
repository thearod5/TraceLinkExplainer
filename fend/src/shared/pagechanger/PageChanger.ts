
import { HOME_ROUTE, SELECT_SOURCE_ARTIFACTS, SELECT_SOURCE_STEP, SELECT_TARGET_ARTIFACTS, TRACE_VIEW_ROUTE, VIEW_TRACE_STEP } from "../../components/constants";
import store from "../../redux/store";
import { RootState } from "../../redux/types";
import { isNonEmptyDataset } from "../types/Dataset";

const DATASET_NOT_SELECTED_ERROR =
  "You must select a dataset before proceeding.";
const SOURCE_NOT_SELECTED_ERROR = "You must select a source artifact.";
const TARGET_NOT_SELECTED_ERROR = "You must select a target artifact.";

export const PAGE_STEP_MAPPING: Record<number, string> = {
  0: HOME_ROUTE,
  1: SELECT_SOURCE_ARTIFACTS,
  2: SELECT_TARGET_ARTIFACTS,
  3: TRACE_VIEW_ROUTE,
};

//write unit tests for state
export function getNewStepState(
  currentState: RootState,
  requestedStep: number
): RootState | string {
  //Step step if an error is found
  const error = getStepChangeError(requestedStep, currentState); //validation
  if (error !== undefined) return error;
  if (currentState.currentStep !== requestedStep && currentState.currentStep === VIEW_TRACE_STEP) {
    return { ...currentState, currentStep: requestedStep, trace: { ...currentState.trace, relationshipColors: null } }
  }
  return { ...currentState, currentStep: requestedStep };
}

export function getStepChangeError(
  requestedStep: number,
  currentState?: RootState
): string | undefined {
  const state = currentState === undefined ? store.getState() : currentState;
  const requestedEndpoint = PAGE_STEP_MAPPING[requestedStep];
  const datasetSelected = isNonEmptyDataset(state.dataset);
  const sourceSelected = state.selectedSources.length > 0;
  const targetSelected = state.selectedTargets.length > 0;

  switch (requestedEndpoint) {
    case HOME_ROUTE:
      return undefined;
    case SELECT_SOURCE_ARTIFACTS:
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
