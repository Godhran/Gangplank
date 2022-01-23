import {combineReducers} from "redux";
import {Loading} from "./loading";
import {Map} from "./map";

const combined = combineReducers({
    map: Map,
    loading: Loading,
})

export default combined;
