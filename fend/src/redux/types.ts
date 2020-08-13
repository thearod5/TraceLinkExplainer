import { Artifact, Dataset } from "../shared/types/Dataset";
import {
  CHANGE_STEP_ACTION,
  CLEAR_DATA,
  REMOVE_SELECTED_SOURCE_ACTION,
  REMOVE_SELECTED_TARGET_ACTION,
  SELECT_DATASET,
  SET_ERROR_ACTION,
  SET_SOURCE_ARTIFACT_ACTION,
  SET_TARGET_ARTIFACT_ACTION,
  UNSELECT_DATASET,
} from "./actions";

/*
 * All
 */

export type CustomAction =
  | MetaActionType
  | DatasetActionType
  | ChangeStepAction;

export interface ClearDataAction {
  type: typeof CLEAR_DATA;
  payload: null;
}

/*
 * Datasets
 */
export interface SelectDatasetAction {
  type: typeof SELECT_DATASET;
  payload: Dataset;
}

export interface UnselectDatasetAction {
  type: typeof UNSELECT_DATASET;
  payload: Dataset;
}

export type DatasetActionType =
  | SelectDatasetAction
  | UnselectDatasetAction
  | ClearDataAction;

/*
 * Meta
 */

export interface ArtifactMutatorActionType {
  type: string;
  payload: Artifact;
}

export interface MetaData {
  oldStep: number;
  currentStep: number;
  targetArtifact: Artifact;
  sourceArtifact: Artifact;

  selectedSources: Artifact[];
  selectedTargets: Artifact[];
  error: string | undefined;
}

export interface ChangeStepAction {
  type: typeof CHANGE_STEP_ACTION;
  payload: number;
}

export interface SetTargetArtifactAction {
  type: typeof SET_TARGET_ARTIFACT_ACTION;
  payload: Artifact;
}

export interface SetSourceArtifactAction {
  type: typeof SET_SOURCE_ARTIFACT_ACTION;
  payload: Artifact;
}

export interface RemoveSelectedSource {
  type: typeof REMOVE_SELECTED_SOURCE_ACTION;
  payload: Artifact;
}

export interface RemoveSelectedTarget {
  type: typeof REMOVE_SELECTED_TARGET_ACTION;
  payload: Artifact;
}

export interface SetError {
  type: typeof SET_ERROR_ACTION;
  payload: string | undefined;
}

export type MetaActionType =
  | RemoveSelectedSource
  | RemoveSelectedTarget
  | SetTargetArtifactAction
  | SetSourceArtifactAction
  | SetError
  | ClearDataAction;
