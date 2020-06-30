import { History } from "history";
import { combineReducers } from "redux";
import { Dataset } from "../../../shared/Dataset";
import { datasetReducer } from "./reducers";

export default function createRootReducer(history: History) {
  return combineReducers({
    dataset: datasetReducer,
  });
}
export interface RootState {
  dataset: Dataset;
}
