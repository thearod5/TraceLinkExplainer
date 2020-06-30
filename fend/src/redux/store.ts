import { createStore } from "redux";
import { datasetReducer } from "./reducers";

const store = createStore(datasetReducer); //TODO: Find way to extend to combineReducers

export default store;
