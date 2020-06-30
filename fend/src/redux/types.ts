import { Dataset } from "../../../shared/Dataset";
import { SELECT_DATASET, UNSELECT_DATASET } from "./actions";

export interface SelectDatasetAction {
  type: typeof SELECT_DATASET;
  payload: Dataset;
}

export interface UnselectDatasetAction {
  type: typeof UNSELECT_DATASET;
  payload: Dataset;
}

export type DatasetActionType = SelectDatasetAction | UnselectDatasetAction;
