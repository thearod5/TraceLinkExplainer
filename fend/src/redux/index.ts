import { History } from "history";
import { combineReducers } from "redux";
import { Dataset } from "../../../shared/Dataset";
import { datasetReducer, metaDataReducer } from "./reducers";
import { MetaData } from "./types";

export default function createRootReducer(history: History) {
  return combineReducers({
    dataset: datasetReducer,
    metaData: metaDataReducer,
  });
}

export interface RootState {
  dataset: Dataset;
  metaData: MetaData;
}
