import { NEW_PAGE, SELECT_DATASET, UNSELECT_DATASET } from "./actions";
import {
  initializeEmptyDataset,
  initializeEmptyMetaData,
} from "./initializers";
import { DatasetActionType, MetaActionType } from "./types";

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
    case NEW_PAGE:
      return {
        ...state,
        oldPage: state.currentPage,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}
