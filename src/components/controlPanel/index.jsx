import React, { useEffect, useContext } from 'react'
import { BiPlay, BiExitFullscreen, BiPause, BiFullscreen, BiVolumeLow, BiVolumeMute } from "react-icons/bi";
import './index.css';
import { Lock, UnLock, checkFullScreen } from '../../utils';
import { QuizContext } from '../../contexts/quizContext';

const ControlPanel = (props) => {
    const { setFullScreen, fullScreen } = useContext(QuizContext)




    const onEnterFullScreen = () => {
        Lock()
        setFullScreen(true)
    }
    const onExitFullScreen = () => {
        UnLock()
        setFullScreen(false)
    }

    return (
        <div className="control_panel">
            <div className="progress" onClick={props.progressHandler}>
                <div
                    className="progress__filled"
                    style={{ flexBasis: `${props.videoProgress}%` }}
                ></div>
            </div>
            <div className="play_icon">
                {props.playable && props.playable2 && props.playing ? (
                    <BiPause onClick={props.playHandler} style={{ color: "white" }} />
                ) : (
                    <>
                        <BiPlay
                            onClick={props.playHandler}
                            style={{ color: "white" }}
                        />
                    </>
                )}
                <div style={{ display: "flex", alignItems: "center" }}>
                    {props.appState.muted ? (
                        <BiVolumeMute
                            style={{ color: "white" }}
                            onClick={() => {
                                props.setAppState({ ...props.appState, muted: false });
                                props.setVolume(1);
                            }}
                        />
                    ) : (
                        <BiVolumeLow
                            style={{ color: "white" }}
                            onClick={() => {
                                props.setAppState({ ...props.appState, muted: true });
                                props.setVolume(0);
                            }}
                        />
                    )}

                    <input
                        type="range"
                        className="slider"
                        id="custom_range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={props.volume}
                        onChange={props.volumeHandler}
                    ></input>
                </div>
                <div style={{ width: "100%", textAlign: "right" }}>
                    {!fullScreen ? <BiFullscreen onClick={() => onEnterFullScreen()} /> : <BiExitFullscreen onClick={() => onExitFullScreen()} />}
                </div>
            </div>
        </div>
    )
}

export default ControlPanel