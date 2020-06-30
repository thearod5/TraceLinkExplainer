import { Dataset } from "../../../shared/Dataset";
import initializeData from "./initializers";
import { SelectDatasetAction, UnselectDatasetAction } from "./types";

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
    payload: initializeData(),
  };
}

export { SELECT_DATASET, selectDataset, UNSELECT_DATASET, unselectDataset };
