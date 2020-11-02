import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { NOT_CACHED } from "../constants";
import { initializeEmptyDataset, initializeEmptyTrace } from "./initializers";
import rootReducer from "./reducers";
import { RootState } from "./types";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dataset", "currentStep", "selectedSources", "selectedTargets",
    "traceSourceIndex", "traceTargetIndex"], // Top level store branches to persist
};

export const appHistory = createBrowserHistory();



const middleware = [thunk, routerMiddleware(appHistory)];

export function createEmptyState(): RootState {
  return {
    currentStep: 0,
    dataset: initializeEmptyDataset(),
    selectedSources: [],
    selectedTargets: [],
    selectedSourceIndex: 0,
    selectedTargetIndex: 0,
    traceSourceIndex: NOT_CACHED,
    traceTargetIndex: NOT_CACHED,
    trace: initializeEmptyTrace(),
    loading: false,
    error: undefined
  };
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//allows for testing teardown
export const store: Store<RootState, AnyAction> = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;
