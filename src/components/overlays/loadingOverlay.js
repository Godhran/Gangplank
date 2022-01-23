import './../../styles/css/loading.css'
import LoadingAnimation from "../animations/loadingAnimation";

const LoadingOverlay = ()=>(
    <div className={'loading-overlay'}>
        <div className={'loading-overlay-animation-container'}>
            <LoadingAnimation/>
        </div>
    </div>
)

export default LoadingOverlay
