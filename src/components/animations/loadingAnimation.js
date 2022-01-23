import React from 'react'
import Lottie from 'react-lottie-player'
import animationJSON from '../../animations/loadingAnimationJSON.json'
import useMap from "../../hooks/hooks.map";
import useLoading from "../../hooks/hooks.loading";

const LoadingAnimation = () => {

    const {
        getPoints,
    } = useMap();

    const {
        setLoading,
    } = useLoading();

    return (
        <Lottie
            animationData={animationJSON}
            loop={false}
            play
            className={'no-visible-data-animation'}
            onComplete={() => {
                getPoints().then(()=>{
                    setTimeout(()=>{
                        setLoading(false)
                    },1500)
                });
            }}
        />
    )
}

export default LoadingAnimation;
