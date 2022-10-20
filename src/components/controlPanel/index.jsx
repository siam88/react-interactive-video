import React, { useEffect, useContext } from 'react'
import { BiPlay, BiExitFullscreen, BiPause, BiFullscreen, BiVolumeLow, BiVolumeMute } from "react-icons/bi";
import './index.css';
import { Lock, UnLock, checkFullScreen } from '../../utils';
import { QuizContext } from '../../contexts/quizContext';
import { FaPlay, FaExpand, FaVolumeMute, FaPause, FaVolumeDown } from 'react-icons/fa'
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
                    <FaPause
                        style={{ marginRight: "15px" }}
                        onClick={props.playHandler}
                        className={'control_Icon'}
                    />
                ) : (
                    <>
                        <FaPlay
                            style={{ marginRight: "15px" }}
                            onClick={props.playHandler}
                            className={'control_Icon '}
                        />
                    </>
                )}
                <div style={{ display: "flex", alignItems: "center" }}>
                    {props.appState.muted ? (
                        <FaVolumeMute
                            className={'control_Icon '}

                            onClick={() => {
                                props.setAppState({ ...props.appState, muted: false });
                                props.setVolume(1);
                            }}
                        />
                    ) : (
                        <FaVolumeDown
                            style={{ color: "white" }}
                            className={'control_Icon'}
                            onClick={() => {
                                props.setAppState({ ...props.appState, muted: true });
                                props.setVolume(0);
                            }}
                        />
                    )}

                    <input
                        style={{ marginLeft: "5px" }}
                        type="range"
                        className="slider"
                        id="custom_range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={props.appState.muted ? 0 : props.volume}
                        onChange={props.volumeHandler}
                    ></input>
                </div>
                <div style={{ width: "100%", textAlign: "right" }}>
                    {!fullScreen ? <FaExpand className={'control_Icon'} onClick={() => onEnterFullScreen()} /> : <BiExitFullscreen className={'control_Icon'} onClick={() => onExitFullScreen()} />}
                </div>
            </div>
        </div>
    )
}

export default ControlPanel