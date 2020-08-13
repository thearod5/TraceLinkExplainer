import { Artifact, Dataset } from "../shared/types/Dataset";
import { initializeEmptyDataset } from "./initializers";
import {
  ArtifactMutatorActionType,
  ClearDataAction,
  SelectDatasetAction,
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

export function changeStep(newStep: number) {
  return {
    type: CHANGE_STEP_ACTION,
    payload: newStep,
  };
}

/*
 * Artifacts
 */

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

export const REMOVE_SELECTED_SOURCE_ACTION = "REMOVE_SELECTED_SOURCE_ACTION";

export function removeSelectedSource(
  selectedArtifact: Artifact
): ArtifactMutatorActionType {
  return {
    type: REMOVE_SELECTED_SOURCE_ACTION,
    payload: selectedArtifact,
  };
}

export const REMOVE_SELECTED_TARGET_ACTION = "REMOVE_SELECTED_TARGET_ACTION";

export function removeSelectedTarget(
  selectedArtifact: Artifact
): ArtifactMutatorActionType {
  return {
    type: REMOVE_SELECTED_TARGET_ACTION,
    payload: selectedArtifact,
  };
}

/*
 * error handling
 */
export const SET_ERROR_ACTION = "SET_ERROR_ACTION";

export interface SetErrorType {
  type: string;
  payload: string | undefined;
}

export function setError(error: string | undefined): SetErrorType {
  return {
    type: SET_ERROR_ACTION,
    payload: error,
  };
}
