import {combineReducers, Reducer} from "redux";
import {homeReducer} from "./Home/Event/Reducer";
import {spawn} from "@redux-saga/core/effects";
import {createHomeSaga} from "./Home/Home";

export function createRoutingSaga(): () => Generator {
    return function* routingSaga() {
        yield spawn(createHomeSaga());
    }
}

export const routingReducer: Reducer = combineReducers({
    home: homeReducer,
});