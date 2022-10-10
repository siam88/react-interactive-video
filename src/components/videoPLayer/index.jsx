import React from 'react'
import ballImage from "../../assets/images/ball.png";
import { ReactCompareSlider, ReactCompareSliderHandle } from "react-compare-slider";


const VideoPlayer = (props) => {
    return (
        <ReactCompareSlider
            onlyHandleDraggable={true}
            handle={
                <>
                    <div className="divider">
                        <img src={ballImage} alt="" className="ball" />
                    </div>
                </>
            }
            itemOne={
                <>
                    <video
                        playsInline
                        autoPlay={props.isAutoPlay}
                        muted={props.appState.muted}
                        width={"100%"}
                        id="video_one"
                        onTimeUpdate={props.timeUpdateHandler}
                        onEnded={() => props.setPlaying(false)}
                        preload="auto"
                        onwaiting={() => {
                            console.log(" video ,i am waiting");
                        }}
                        onStalled={(e) => console.log("hello", e)}

                    >
                        <source
                            src="https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_32.mp4"
                            type="video/mp4"
                        />
                    </video>
                </>
            }
            itemTwo={
                <>
                    <video
                        autoPlay={props.isAutoPlay}
                        muted={props.appState.muted}
                        playsInline
                        width={"100%"}
                        id="video_two"
                        preload="auto"
                        onwaiting={() => {
                            console.log(" video 2,i am waiting");
                        }}
                    >
                        <source
                            src="https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_12.mp4"
                            type="video/mp4"
                        />
                    </video>
                </>
            }
        />
    )
}

export default VideoPlayer