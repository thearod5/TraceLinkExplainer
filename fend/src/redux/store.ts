import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import createRootReducer from "./index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dataset", "metaData"], // Top level store branches to persist
};

export const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history)
);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;
