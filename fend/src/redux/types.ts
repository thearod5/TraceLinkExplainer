import { Artifact, Dataset } from "../../../shared/Dataset";
import {
  CHANGE_STEP_ACTION,
  CLEAR_DATA,
  SELECT_DATASET,
  SET_SOURCE_ARTIFACT_ACTION,
  SET_TARGET_ARTIFACT_ACTION,
  UNSELECT_DATASET,
} from "./actions";

/*
 * All
 */

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

export interface MetaData {
  oldStep: number;
  currentStep: number;
  targetArtifact: Artifact;
  sourceArtifact: Artifact;
}

export type StepPayload = Dataset | Artifact | undefined;

export interface StepChangePayload {
  newStep: number;
  stepPayload: StepPayload;
}

export interface ChangeStepAction {
  type: typeof CHANGE_STEP_ACTION;
  payload: StepChangePayload; //name of new page
}

export interface SetTargetArtifactAction {
  type: typeof SET_TARGET_ARTIFACT_ACTION;
  payload: Artifact;
}

export interface SetSourceArtifactAction {
  type: typeof SET_SOURCE_ARTIFACT_ACTION;
  payload: Artifact;
}

export type MetaActionType =
  | SetTargetArtifactAction
  | SetSourceArtifactAction
  | ClearDataAction;
