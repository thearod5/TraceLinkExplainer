import { Artifact, Dataset } from "../shared/types/Dataset";
import { ArtifactMutatorActionType } from "./types";

/*
 * All
 */

export type CustomAction =
  | SelectDatasetAction
  | UnselectDatasetAction
  | SetSelectedTargetsAction
  | SetSelectedSourcesAction
  | ChangeStepAction
  | SetError
  | ClearDataAction
  | ClearDataAction
  | ArtifactMutatorActionType;

/*
 * Datasets
 */
export const SELECT_DATASET = "SELECT_DATASET";

export interface SelectDatasetAction {
  type: typeof SELECT_DATASET;
  payload: Dataset;
}

export function selectDataset(dataset: Dataset): SelectDatasetAction {
  return {
    type: SELECT_DATASET,
    payload: dataset,
  };
}

export const UNSELECT_DATASET = "UNSELECT_DATASET";

export interface UnselectDatasetAction {
  type: typeof UNSELECT_DATASET;
  payload: undefined;
}

export function unselectDataset(): UnselectDatasetAction {
  return {
    type: UNSELECT_DATASET,
    payload: undefined,
  };
}

/*
 * Meta
 */

export const CHANGE_STEP_ACTION = "CHANGE_STEP";

export interface ChangeStepAction {
  type: typeof CHANGE_STEP_ACTION;
  payload: number;
}

export function changeStep(newStep: number) {
  return {
    type: CHANGE_STEP_ACTION,
    payload: newStep,
  };
}

/*
 * Artifacts
 */

export const SET_SELECTED_SOURCES_ACTION = "SET_SOURCE_ARTIFACT_ACTION";

export interface SetSelectedSourcesAction {
  type: typeof SET_SELECTED_SOURCES_ACTION;
  payload: Artifact;
}

export function setSelectedSources(
  sourceArtifact: Artifact[]
): ArtifactMutatorActionType {
  return {
    type: SET_SELECTED_SOURCES_ACTION,
    payload: sourceArtifact,
  };
}

export const SET_SELECTED_TARGETS_ACTION = "SET_TARGET_ARTIFACT_ACTION";

export interface SetSelectedTargetsAction {
  type: typeof SET_SELECTED_TARGETS_ACTION;
  payload: Artifact;
}

export function setSelectedTargets(
  targetArtifact: Artifact[]
): ArtifactMutatorActionType {
  return {
    type: SET_SELECTED_TARGETS_ACTION,
    payload: targetArtifact,
  };
}

/*
 * Meta
 */
export const SET_ERROR_ACTION = "SET_ERROR_ACTION";

export interface SetError {
  type: typeof SET_ERROR_ACTION;
  payload: string | undefined;
}

export function setError(error: string | undefined): SetError {
  return {
    type: SET_ERROR_ACTION,
    payload: error,
  };
}

export const CLEAR_DATA = "CLEAR_DATA";

export interface ClearDataAction {
  type: typeof CLEAR_DATA;
  payload: undefined;
}

export function clearData(): ClearDataAction {
  return {
    type: CLEAR_DATA,
    payload: undefined,
  };
}
