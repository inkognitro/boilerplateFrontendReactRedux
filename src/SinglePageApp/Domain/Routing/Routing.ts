import { combineReducers, Reducer } from "redux";
import { spawn } from "redux-saga/effects";
import { homeReducer } from "./Home/Event/Reducer";
import { createHomeSaga } from "./Home/Home";

export function createRoutingSaga(): () => Generator {
    return function* routingSaga(): Generator {
        yield spawn(createHomeSaga());
    };
}

export const routingReducer: Reducer = combineReducers({
    home: homeReducer,
});
