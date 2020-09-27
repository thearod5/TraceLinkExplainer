import { Artifact, Dataset } from "../shared/types/Dataset";
import { Trace, WordDescriptorDisplay } from "../shared/types/Trace";
import { ArtifactMutatorActionType } from "./types";

/*
 * All
 */

export type CustomAction =
  | SelectDatasetAction
  | UnselectDatasetAction
  | SetSelectedTargetsAction
  | SetSelectedSourcesAction
  | SetSelectedSourceIndex
  | SetSelectedTargetIndex
  | SetTraceSourceIndexAction
  | SetTraceTargetIndexAction
  | ChangeStepAction
  | SetError
  | ClearDataAction
  | ClearDataAction
  | ArtifactMutatorActionType
  | SetTrace;

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

export const SET_SELECTED_SOURCE_INDEX_ACTION = "SET_SELECTED_SOURCE_INDEX_ACTION";

export interface SetSelectedSourceIndex {
  type: typeof SET_SELECTED_SOURCE_INDEX_ACTION;
  payload: number;
}

export function setSelectedSourceIndex(
  index: number
) {
  return {
    type: SET_SELECTED_SOURCE_INDEX_ACTION,
    payload: index,
  };
}

export const SET_SELECTED_TARGET_INDEX_ACTION = "SET_SELECTED_TARGET_INDEX_ACTION";

export interface SetSelectedTargetIndex {
  type: typeof SET_SELECTED_TARGET_INDEX_ACTION;
  payload: number;
}

export function setSelectedTargetIndex(
  index: number
) {
  return {
    type: SET_SELECTED_TARGET_INDEX_ACTION,
    payload: index,
  };
}

/*
 * Trace indices
 */
export const SET_TRACE_SOURCE_INDEX_ACTION = "SET_TRACE_SOURCE_INDEX_ACTION";

export interface SetTraceSourceIndexAction {
  type: typeof SET_TRACE_SOURCE_INDEX_ACTION;
  payload: number;
}

export function setTraceSourceIndex(
  index: number
) {
  return {
    type: SET_TRACE_SOURCE_INDEX_ACTION,
    payload: index,
  };
}
export const SET_TRACE_TARGET_INDEX_ACTION = "SET_TRACE_TARGET_INDEX_ACTION";

export interface SetTraceTargetIndexAction {
  type: typeof SET_TRACE_TARGET_INDEX_ACTION;
  payload: number;
}

export function setTraceTargetIndex(
  index: number
) {
  return {
    type: SET_TRACE_TARGET_INDEX_ACTION,
    payload: index,
  };
}

/*
 * Meta
 */

export const SET_TRACE_ACTION = "SET_TRACE_ACTION"

export interface SetTrace {
  type: typeof SET_TRACE_ACTION;
  payload: Trace
}

export function setTrace(trace: Trace) {
  return {
    type: SET_TRACE_ACTION,
    payload: trace
  }
}

export const SET_SELECTED_WORD_ACTION = "SET_SELECTED_WORD_ACTION"

export interface SetSelectedWord {
  type: typeof SET_SELECTED_WORD_ACTION,
  payload: WordDescriptorDisplay | null
}

export function setSelectedWord(word: WordDescriptorDisplay | null) {
  return {
    type: SET_SELECTED_WORD_ACTION,
    payload: word
  }
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

export const SET_LOADING_ACTION = "SET_LOADING_ACTION";

export interface SetLoadingAction {
  type: typeof SET_LOADING_ACTION;
  payload: boolean;
}

export function setLoading(loading: boolean) {
  return {
    type: SET_LOADING_ACTION,
    payload: loading,
  };
}
