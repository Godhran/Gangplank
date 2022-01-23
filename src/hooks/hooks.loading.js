import {useDispatch, useSelector} from "react-redux";
import {SET_LOADING} from "../constants/action-types";

const useLoading = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.loading.loading)

    const setLoading = (state) => {
        dispatch({type: SET_LOADING, loading: state});
    };

    return {
        loading,
        setLoading
    }
}

export default useLoading;
