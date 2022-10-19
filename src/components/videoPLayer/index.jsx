import React from 'react'
import ballImage from "../../assets/all-images/ball.png";
import { ReactCompareSlider, ReactCompareSliderHandle } from "react-compare-slider";


const VideoPlayer = (props) => {
    return (
        <ReactCompareSlider
            onlyHandleDraggable={true}
            handle={
                <>
                    <div className="divider">
                        <div className='ball_controller'>
                            <img src={ballImage} alt="" className="ball" />
                        </div>

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
                            src="https://d2uz5qswi21q1o.cloudfront.net/bts/5mb_Chroma.mp4"
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
                            src="https://d2uz5qswi21q1o.cloudfront.net/bts/5mb_tvc.mp4"
                            type="video/mp4"
                        />
                    </video>
                </>
            }
        />
    )
}

export default VideoPlayer