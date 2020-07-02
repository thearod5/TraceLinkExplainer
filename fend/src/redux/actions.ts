import { Dataset } from "../../../shared/Dataset";
import { initializeEmptyDataset } from "./initializers";
import { SelectDatasetAction, UnselectDatasetAction } from "./types";

/*
 * Datasets
 */
const SELECT_DATASET = "SELECT_DATASET";
const UNSELECT_DATASET = "UNSELECT_DATASET";

function selectDataset(dataset: Dataset): SelectDatasetAction {
  return {
    type: SELECT_DATASET,
    payload: dataset,
  };
}

function unselectDataset(): UnselectDatasetAction {
  return {
    type: UNSELECT_DATASET,
    payload: initializeEmptyDataset(),
  };
}

export { SELECT_DATASET, selectDataset, UNSELECT_DATASET, unselectDataset };

/*
 * Meta
 */

export const NEW_PAGE = "NEW_PAGE";

export function newPage(newPageName: string) {
  return {
    type: NEW_PAGE,
    payload: newPageName,
  };
}