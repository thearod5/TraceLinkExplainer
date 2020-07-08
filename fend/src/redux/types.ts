import { Artifact, Dataset } from "../../../shared/Dataset";
import {
  NEW_PAGE_ACTION,
  SELECT_DATASET,
  SET_TARGET_ARTIFACT_ACTION,
  UNSELECT_DATASET,
} from "./actions";

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

export type DatasetActionType = SelectDatasetAction | UnselectDatasetAction;

/*
 * Meta
 */

export interface MetaData {
  oldPage: string;
  currentPage: string;
  targetArtifact: Artifact;
  sourceArtifact: Artifact;
}

export interface NewPageAction {
  type: typeof NEW_PAGE_ACTION;
  payload: string; //name of new page
}

export interface SetTargetArtifactAction {
  type: typeof SET_TARGET_ARTIFACT_ACTION;
  payload: ArtifactMetaInformation;
}

export interface SetSourceArtifactAction {
  type: typeof SET_SOURCE_ARTIFACT_ACTION;
  payload: ArtifactMetaInformation;
}

export type MetaActionType =
  | NewPageAction
  | SetTargetArtifactAction
  | SetSourceArtifactAction;
