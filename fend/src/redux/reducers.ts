import { combineReducers } from "redux";
import { SELECT_DATASET, UNSELECT_DATASET } from "./actions";
import initializeData from "./initializers";
import { DatasetActionType } from "./types";

export function datasetReducer(
  state = initializeData(),
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

export default function rootReducer() {
  return combineReducers({
    dataset: datasetReducer,
  });
}
