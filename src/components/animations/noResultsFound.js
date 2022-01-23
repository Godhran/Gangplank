import React from 'react'
import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'


import animationJSON from '../../animations/noResultsAnimationJSON.json'

const NoResultsFound = () => {
    return (
        <div style={{textAlign:'center'}}>
            <Lottie
                loop
                animationData={animationJSON}
                play
                className={'no-visible-data-animation'}
            />
            <p className={'no-visible-data-notification'}>No Visible Data</p>
        </div>
    )
}

export default NoResultsFound;
