import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MapActions} from "../actions/map";
import {LoadingActions} from "../actions";
import {toast} from "react-toastify";

const useMap = () => {
        const dispatch = useDispatch();

        const features = useSelector(state => state.map.features);
        const materials = useSelector(state => state.map.materials);
        const pointsInView = useSelector(state => state.map.pointsInView);
        const filter = useSelector(state => state.map.filter);
        const boundingBox = useSelector(state => state.map.boundingBox);

        const [errors, setErrors] = useState({});

        const getPoints = () => {
            return new Promise(async (resolve, reject) => {
                dispatch(MapActions.getPoints()).then(resp => {
                    setErrors({})
                    toast.success('GeoJSON Data Loaded')
                    resolve(resp)
                }, (errors) => {
                    toast.error('Error')
                    setErrors(errors)
                    resolve(false);
                });
            });
        };

        const setFilterData = (data) => {
            return new Promise(async (resolve, reject) => {
                const {type, value} = data;
                dispatch(MapActions.setFilterData({type, value, boundingBox})).then(resp => {
                    setErrors({})
                    resolve(resp)
                }, (errors) => {
                    setErrors(errors)
                    resolve(false);
                });
            });
        };

        const clearFilterData = () => {
            return new Promise(async (resolve, reject) => {
                dispatch(MapActions.clearFilterData({boundingBox})).then(resp => {
                    setErrors({})
                    resolve(resp)
                }, (errors) => {
                    setErrors(errors)
                    resolve(false);
                });
            });
        }

        const getPointsInView = () => {
            // if(boundingBox.)
            ('here')
            return new Promise(async (resolve, reject) => {
                dispatch(MapActions.getPointsInView({features, filter, boundingBox})).then(resp => {
                    setErrors({})
                    resolve(resp)
                }, (errors) => {
                    setErrors(errors)
                    resolve(false);
                });
            });
        }

        const setBoundingBox = (boundingBox) => {
            return new Promise(async (resolve, reject) => {
                dispatch(MapActions.setBoundingBox({boundingBox})).then(resp => {
                    setErrors({})
                    resolve(resp)
                }, (errors) => {
                    setErrors(errors)
                    resolve(false);
                });
            });
        }

        return {
            errors,
            setErrors,
            features,
            pointsInView,
            filter,
            materials,
            getPoints,
            getPointsInView,
            setFilterData,
            setBoundingBox,
            clearFilterData
        };
    }
;

export default useMap;
