import {SET_LOADING} from "../../constants/action-types";

const initialState = {
    loading: true,
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.value
            }
        default:
            return state;
    }
}

export default Reducer;
