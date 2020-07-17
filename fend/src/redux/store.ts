import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, CombinedState, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { Dataset } from "../../../shared/Dataset";
import { getNewStepState } from "../stepmanager/PageChanger";
import { CHANGE_STEP_ACTION, CLEAR_DATA } from "./actions";
import createRootReducer from "./index";
import { createEmptyState } from "./reducers";
import {
  ChangeStepAction,
  DatasetActionType,
  MetaActionType,
  MetaData,
} from "./types";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dataset", "metaData"], // Top level store branches to persist
};

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

const appReducer = createRootReducer(history);

type CombinedAppState = CombinedState<{
  dataset: Dataset;
  metaData: MetaData;
}>;

const rootReducer = (
  state = createEmptyState(),
  action: MetaActionType | DatasetActionType | ChangeStepAction
) => {
  switch (action.type) {
    case CLEAR_DATA:
      return appReducer(undefined, action);
    case CHANGE_STEP_ACTION:
      const newStep = action.payload.newStep;
      const stepPayload = action.payload.stepPayload;
      const result = getNewStepState(state, newStep, stepPayload);
      if (typeof result === "string") {
        alert(result);
        return state;
      }
      return result;

    default:
      return appReducer(state, action);
  }
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;
