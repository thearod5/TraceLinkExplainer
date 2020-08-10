import { RootState } from ".";
import { Artifact } from "../../../shared/Dataset";
import {
  REMOVE_SELECTED_SOURCE_ACTION,
  REMOVE_SELECTED_TARGET_ACTION,
  SELECT_DATASET,
  SET_SOURCE_ARTIFACT_ACTION,
  SET_TARGET_ARTIFACT_ACTION,
  UNSELECT_DATASET,
} from "./actions";
import {
  initializeEmptyArtifact,
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
        selectedSources: [...state.selectedSources, action.payload],
      };
    case SET_TARGET_ARTIFACT_ACTION:
      return {
        ...state,
        targetArtifact: action.payload,
        selectedTargets: [...state.selectedTargets, action.payload],
      };
    case REMOVE_SELECTED_SOURCE_ACTION:
      return {
        ...state,
        selectedSources: state.selectedSources.filter(
          (a) => !artifactsAreEqual(a, action.payload)
        ),
        sourceArtifact: artifactsAreEqual(state.sourceArtifact, action.payload)
          ? initializeEmptyArtifact()
          : state.sourceArtifact,
      };
    case REMOVE_SELECTED_TARGET_ACTION:
      return {
        ...state,
        selectedTargets: state.selectedTargets.filter(
          (a) => !artifactsAreEqual(a, action.payload)
        ),
        targetArtifact: artifactsAreEqual(state.targetArtifact, action.payload)
          ? initializeEmptyArtifact()
          : state.targetArtifact,
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

function artifactsAreEqual(a1: Artifact, a2: Artifact) {
  return a1.type === a2.type && a1.id === a2.id;
}

export function changeStepReducer(
  state: RootState,
  action: ChangeStepAction
): RootState {
  const newStep = action.payload;
  const result = getNewStepState(state, newStep);
  if (typeof result === "string") {
    alert(result); // this is an error now
    return state;
  }
  return result;
}
