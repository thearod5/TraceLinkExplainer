import { createStore } from "redux";
import rootReducer from "./index";

const store = createStore(rootReducer()); //TODO: Find way to extend to combineReducers

export default store;
