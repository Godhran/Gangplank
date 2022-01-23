import {SET_LOADING} from "../../constants/action-types";
const actions = {
    setLoading: (status) => async (dispatch) => {
        dispatch({ type: SET_LOADING, loading: status });
    },
}

export default actions;
