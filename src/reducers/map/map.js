import {
    SET_FEATURES, SET_POINTS_IN_VIEW, SET_FILTER, SET_MATERIALS, SET_BOUNDING_BOX
} from "../../constants/action-types";

const initialState = {
    features: [],
    materials: [],
    pointsInView: [],
    boundingBox: {
        _sw: {
            lng: 0,
            lat: 0
        },
        _ne: {
            lng: 0,
            lat: 0
        }
    },
    filter: {type: '', value: ''}
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FEATURES:
            return {
                ...state,
                features: action.value
            }
        case SET_MATERIALS:
            return {
                ...state,
                materials: action.value
            }
        case SET_POINTS_IN_VIEW:
            return {
                ...state,
                pointsInView: action.value
            }
        case SET_FILTER:
            return {
                ...state,
                filter: action.value
            }
        case SET_BOUNDING_BOX:
            return {
                ...state,
                boundingBox: action.value
            }
        default:
            return state;
    }
}

export default Reducer;
