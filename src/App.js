import './App.css';
import './styles/css/map.css';
import './styles/css/mapbox-gl.css';

import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import ReactMapGL, {AttributionControl, Layer, Source} from 'react-map-gl';
import useMap from "./hooks/hooks.map";

import {ThemeProvider} from '@mui/material/styles'
import Theme from './styles/theme'

import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify";
import {MenuFab} from "./components/nav/menuFab";
import Colours from "./styles/colours";
import LoadingOverlay from "./components/overlays/loadingOverlay";
import useLoading from "./hooks/hooks.loading";


const accessToken = 'pk.eyJ1IjoibDAwMTQ0NjE0IiwiYSI6ImNreW5rM3MwNzNxaWgyb3BiZnJmeng2bGoifQ.bUufbHaHPrRn3EjZPNq-PA';
const styleURL = 'mapbox://styles/mapbox/dark-v9';

const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
        'fill-color': [
            'match',
            ['get', 'material'],
            'Concrete',
            Colours.orange,
            'Gravel',
            Colours.yellow,
            'Interlock Conc Block',
            Colours.green,
            'Bitumen',
            Colours.purple,
            'Earth',
            Colours.pink,
            'Other',
            Colours.cyan,
            /* other */ '#ccc'
        ],
        'fill-opacity': 1
    }
}

const centerCoordinates = {
    lat: -28.0167,
    lon: 153.4000
}

const App = () => {
    const mapRef = useRef(null);

    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: centerCoordinates.lat,
        longitude: centerCoordinates.lon,
        zoom: 11
    });

    // Since it's not actually an API call I just placed in loading animation instead
    // useEffect(() => {
    //     mount();
    // }, []);

    const {
        features,
        getPointsInView,
        setBoundingBox,
    } = useMap();

    const {
        loading,
    } = useLoading();

    // const mount = useCallback(
    //     () => {
    //         getPoints().then();
    //     },
    //     [getPoints]
    // );


    const [hoverInfo, setHoverInfo] = useState(null);

    const onHover = useCallback(event => {
        const {
            features,
            srcEvent: {offsetX, offsetY}
        } = event;
        const hoveredFeature = features && features[0];

        setHoverInfo(
            hoveredFeature
                ? {
                    feature: hoveredFeature,
                    x: offsetX,
                    y: offsetY
                }
                : null
        );
    }, []);

    return (
        <ThemeProvider theme={Theme}>

            {features?.features?.length > 0 &&
                <>
                    <ReactMapGL
                        {...viewport}
                        ref={mapRef}
                        id={'map'}
                        width="100vw"
                        height="100vh"
                        mapStyle={styleURL}
                        attributionControl={false}
                        //Populate Initial Bounds, get data in view
                        onLoad={() => {
                            const bounds = mapRef.current.getMap().getBounds();
                            setBoundingBox(bounds).then();
                            getPointsInView().then();
                        }}
                        onInteractionStateChange={(state) => {
                            //If I had more time I would have worked out something to stop it updating, and redrawing,
                            // as the map moved. It worked fine for dragging but stopped zooming after around 100ms
                            //Don't update when the map is in motion, only update when it finishes moving
                            if (
                                state.isDragging ||
                                state.inTransition ||
                                state.isRotating ||
                                state.isZooming ||
                                state.isHovering ||
                                state.isPanning
                            ) {
                            } else {
                                const bounds = mapRef.current.getMap().getBounds();
                                setBoundingBox(bounds).then();
                                getPointsInView().then();
                            }
                        }

                        }
                        onViewportChange={(viewport) => {
                            setViewport(viewport)
                        }}
                        mapboxApiAccessToken={accessToken}
                        interactiveLayerIds={['data']}
                        onHover={onHover}
                    >
                        <Source key={`${features.features.length}_features`} type="geojson" data={features}>
                            <Layer {...dataLayer} />
                        </Source>

                        {hoverInfo && (
                            <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
                                <div>Type: {hoverInfo.feature.properties.type}</div>
                                <div>Material: {hoverInfo.feature.properties.material}</div>
                                <div>Size: {hoverInfo.feature.properties.area_}</div>
                                {hoverInfo.feature.properties.comments &&
                                    <div>Note:<br/>{hoverInfo.feature.properties.comments}</div>
                                }
                            </div>
                        )}

                        <AttributionControl compact={true} className={'attribution-control'}/>
                    </ReactMapGL>
                    <MenuFab/>
                </>
            }

            {loading &&
                <LoadingOverlay/>
            }

            <ToastContainer
                position={'top-center'}
                autoClose={2000}
                closeButton={false}/>
        </ThemeProvider>


    );
}

export default App;
