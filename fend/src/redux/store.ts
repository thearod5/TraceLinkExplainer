import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { initializeEmptyDataset } from "./initializers";
import rootReducer from "./reducers";
import { RootState } from "./types";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dataset", "currentStep", "selectedSources", "selectedTargets"], // Top level store branches to persist
};

export const appHistory = createBrowserHistory();

const middleware = [thunk, routerMiddleware(appHistory)];

export function createEmptyState(): RootState {
  return {
    currentStep: 0,
    selectedSources: [],
    selectedTargets: [],
    error: undefined,
    dataset: initializeEmptyDataset(),
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
