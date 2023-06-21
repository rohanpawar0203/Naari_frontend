import { legacy_createStore } from "redux";
import { combineReducers } from "redux";
import { Reducer } from "../Reducers/Reducers";

let CR = combineReducers({ Reducer });

export const store = legacy_createStore(CR);