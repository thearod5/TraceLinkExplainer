import { Dataset } from "../../../shared/Dataset";
import { NEW_PAGE, SELECT_DATASET, UNSELECT_DATASET } from "./actions";

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
}

export interface NewPageAction {
  type: typeof NEW_PAGE;
  payload: string; //name of new page
}

export type MetaActionType = NewPageAction;
