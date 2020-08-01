import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { CHANGE_STEP_ACTION, CLEAR_DATA } from "./actions";
import createRootReducer, { RootState } from "./index";
import { changeStepReducer, createEmptyState } from "./reducers";
import { CustomAction } from "./types";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dataset", "metaData"], // Top level store branches to persist
};

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

const appReducer = createRootReducer(history);

const rootReducer = (state = createEmptyState(), action: CustomAction) => {
  switch (action.type) {
    case CLEAR_DATA:
      return appReducer(undefined, action);
    case CHANGE_STEP_ACTION:
      return changeStepReducer(state, action);
    default:
      return appReducer(state, action);
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store<RootState, CustomAction> = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

// export const persistor = persistStore(store);

export default store;
