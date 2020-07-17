import { Artifact, Dataset } from "../../../shared/Dataset";
import { initializeEmptyDataset } from "./initializers";
import {
  ClearDataAction,
  SelectDatasetAction,
  StepPayload,
  UnselectDatasetAction,
} from "./types";

/*
 * All
 */

export const CLEAR_DATA = "CLEAR_DATA";

export function clearData(): ClearDataAction {
  return {
    type: CLEAR_DATA,
    payload: null,
  };
}

/*
 * Datasets
 */
export const SELECT_DATASET = "SELECT_DATASET";
export const UNSELECT_DATASET = "UNSELECT_DATASET";

export function selectDataset(dataset: Dataset): SelectDatasetAction {
  return {
    type: SELECT_DATASET,
    payload: dataset,
  };
}

export function unselectDataset(): UnselectDatasetAction {
  return {
    type: UNSELECT_DATASET,
    payload: initializeEmptyDataset(),
  };
}

/*
 * Meta
 */

export const CHANGE_STEP_ACTION = "CHANGE_STEP";

export function changeStep(newStep: number, stepPayload: StepPayload) {
  return {
    type: CHANGE_STEP_ACTION,
    payload: {
      newStep,
      stepPayload,
    },
  };
}

/*
 * Artifacts
 */

export interface ArtifactMutatorActionType {
  type: string;
  payload: Artifact;
}

export const SET_SOURCE_ARTIFACT_ACTION = "SET_SOURCE_ARTIFACT_ACTION";

export function setSourceArtifact(
  sourceArtifact: Artifact
): ArtifactMutatorActionType {
  return {
    type: SET_SOURCE_ARTIFACT_ACTION,
    payload: sourceArtifact,
  };
}

export const SET_TARGET_ARTIFACT_ACTION = "SET_TARGET_ARTIFACT_ACTION";

export function setTargetArtifact(
  targetArtifact: Artifact
): ArtifactMutatorActionType {
  return {
    type: SET_TARGET_ARTIFACT_ACTION,
    payload: targetArtifact,
  };
}
