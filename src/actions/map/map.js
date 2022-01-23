import {
    SET_FEATURES,
    SET_FILTER, SET_MATERIALS,
    SET_POINTS_IN_VIEW,
    SET_BOUNDING_BOX
} from "../../constants/action-types";

import MapData from './../../data/boat_ramps.json'

const actions = {
    getPoints: () => async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            dispatch({type: SET_FEATURES, value: MapData});
            const materials = [...new Set(MapData.features.map(entry=>entry.properties.material))]
            dispatch({type: SET_MATERIALS, value: materials});

            resolve(true)
        })
    },
    setFilterData: ({type, value,boundingBox}) => async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            dispatch({type: SET_FILTER, value: {type, value}});

            let filteredData = JSON.parse(JSON.stringify(MapData));

            if (type === 'Material') {
                filteredData.features = MapData.features.filter(point =>
                    point.properties.material === value
                )
            } else {
                let range = value.replace('-', ' ').split(' ');

                range.forEach((entry, index) => {
                    range[index] = parseInt(entry)
                })

                filteredData.features = MapData.features.filter(point => {
                        return point.properties.area_ >= range[0] && point.properties.area_ <= range[1]
                    }
                )
            }
            
            dispatch({type: SET_FEATURES, value: filteredData});

            const points = filteredData.features.filter(entry => {
                const point = entry.geometry.coordinates[0][0][0];
                return boundingBox._sw.lng <= point[0] &&
                    point[0] <= boundingBox._ne.lng &&
                    boundingBox._sw.lat <= point[1] &&
                    point[1] <= boundingBox._ne.lat
            })

            dispatch({type: SET_POINTS_IN_VIEW, value: points});

            resolve(true)
        })
    },
    clearFilterData: ({boundingBox}) => async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            dispatch({type: SET_FILTER, value: {type: '', value: ''}});
            
            dispatch({type: SET_FEATURES, value: MapData});

            const points = MapData.features.filter(entry => {
                const point = entry.geometry.coordinates[0][0][0];
                return boundingBox._sw.lng <= point[0] &&
                    point[0] <= boundingBox._ne.lng &&
                    boundingBox._sw.lat <= point[1] &&
                    point[1] <= boundingBox._ne.lat
            })

            dispatch({type: SET_POINTS_IN_VIEW, value: points});
            resolve(true)
        })
    },
    setBoundingBox: ({boundingBox}) => async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            dispatch({type: SET_BOUNDING_BOX, value: boundingBox});
            resolve(true)
        })
    },
    getPointsInView: ({features, boundingBox, filter}) => async (dispatch) => {
        return new Promise(async (resolve, reject) => {
            let visiblePoints = features.features;

            // if (filter.value.length > 0) {
            //     if(filter.type==='Material'){
            //
            //         visiblePoints = visiblePoints.filter(point =>
            //             point.properties.material === filter.value
            //         )
            //     }else{
            //
            //     }
            // }

            const points = features.features.filter(entry => {
                const point = entry.geometry.coordinates[0][0][0];
                return boundingBox._sw.lng <= point[0] &&
                    point[0] <= boundingBox._ne.lng &&
                    boundingBox._sw.lat <= point[1] &&
                    point[1] <= boundingBox._ne.lat
            })

            dispatch({type: SET_POINTS_IN_VIEW, value: points});
        })
    }
};

export default actions;
