import { RootState } from ".";
import {
  SELECT_DATASET,
  SET_SELECTED_SOURCE_ACTION,
  SET_SELECTED_TARGET_ACTION,
  SET_SOURCE_ARTIFACT_ACTION,
  SET_TARGET_ARTIFACT_ACTION,
  UNSELECT_DATASET,
} from "./actions";
import {
  initializeEmptyDataset,
  initializeEmptyMetaData,
} from "./initializers";
import { getNewStepState } from "./stepmanager/PageChanger";
import { ChangeStepAction, DatasetActionType, MetaActionType } from "./types";

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
    case SET_SELECTED_SOURCE_ACTION:
      return {
        ...state,
        selectedSources: action.payload,
      };
    case SET_SELECTED_TARGET_ACTION:
      return {
        ...state,
        selectedTargets: action.payload,
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

export function changeStepReducer(
  state: RootState,
  action: ChangeStepAction
): RootState {
  const newStep = action.payload.newStep;
  const stepPayload = action.payload.stepPayload;
  const result = getNewStepState(state, newStep, stepPayload);
  if (typeof result === "string") {
    alert(result); // this is an error now
    return state;
  }
  return result;
}
