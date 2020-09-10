import { getNewStepState } from "../shared/pagechanger/PageChanger";
import { areArtifacts, isDataset } from "../shared/types/Dataset";
import {
  CHANGE_STEP_ACTION,
  CLEAR_DATA,
  CustomAction,
  SELECT_DATASET,
  SET_ERROR_ACTION,
  SET_SELECTED_SOURCES_ACTION,
  SET_SELECTED_TARGETS_ACTION,
  UNSELECT_DATASET,
} from "./actions";
import { initializeEmptyDataset, initializeRootState } from "./initializers";
import { RootState } from "./types";

export default (
  state = initializeRootState(),
  action: CustomAction
): RootState => {
  switch (action.type) {
    case SELECT_DATASET:
      if (isDataset(action.payload)) {
        return {
          ...state,
          dataset: action.payload,
        };
      } else throw new Error(createReducerError("Dataset", action.payload));

    case UNSELECT_DATASET:
      return {
        ...state,
        dataset: initializeEmptyDataset(),
      };

    case CHANGE_STEP_ACTION:
      const newStep = action.payload;
      if (typeof newStep === "number") {
        const result = getNewStepState(state, newStep);
        return typeof result === "string"
          ? { ...state, error: result }
          : result;
      } else throw new Error(createReducerError("Number", newStep));

    case SET_SELECTED_SOURCES_ACTION:
      if (areArtifacts(action.payload)) {
        return {
          ...state,
          selectedSources: action.payload,
        };
      } else throw new Error(createReducerError("Artifact[]", action.payload));

    case SET_SELECTED_TARGETS_ACTION:
      if (areArtifacts(action.payload)) {
        return {
          ...state,
          selectedTargets: action.payload,
        };
      } else throw new Error(createReducerError("Artifact[]", action.payload));

    case SET_ERROR_ACTION:
      if (typeof action.payload === "string") {
        return {
          ...state,
          error: action.payload,
        };
      } else if (action.payload === undefined) {
        return { ...state, error: undefined };
      } else {
        throw new Error(createReducerError("string", action.payload));
      }

    case CLEAR_DATA:
      return initializeRootState();
    default:
      return state;
  }
};

function createReducerError(error: string, payload: any) {
  return `Expected a ${error}. Given: ${payload}.`;
}
