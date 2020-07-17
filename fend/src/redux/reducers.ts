import { RootState } from ".";
import {
  CHANGE_STEP_ACTION,
  SELECT_DATASET,
  SET_SOURCE_ARTIFACT_ACTION,
  SET_TARGET_ARTIFACT_ACTION,
  UNSELECT_DATASET,
} from "./actions";
import {
  initializeEmptyDataset,
  initializeEmptyMetaData,
} from "./initializers";
import { DatasetActionType, MetaActionType } from "./types";

export function datasetReducer(
  state = initializeEmptyDataset(),
  action: DatasetActionType
) {
  switch (action.type) {
    case SELECT_DATASET:
      return action.payload;
    case UNSELECT_DATASET:
      return action.payload;
    default:
      return state;
  }
}

export function metaDataReducer(
  state = initializeEmptyMetaData(),
  action: MetaActionType
) {
  switch (action.type) {
    case CHANGE_STEP_ACTION:
      return {
        ...state,
        oldStep: state.currentStep,
        currentStep: action.payload,
      };
    case SET_SOURCE_ARTIFACT_ACTION:
      return {
        ...state,
        sourceArtifact: action.payload,
      };
    case SET_TARGET_ARTIFACT_ACTION:
      return {
        ...state,
        targetArtifact: action.payload,
      };
    default:
      return state;
  }
}

export function createEmptyState(): RootState {
  return {
    metaData: initializeEmptyMetaData(),
    dataset: initializeEmptyDataset(),
  };
}
