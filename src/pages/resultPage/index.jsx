import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import resultPageBackground from '../../assets/images/resultPageBackground.png'
import Failed from './failed'
import Success from './success';
import VideoLayout from './../../layout/videoLayout/index';

const ResultPage = (props) => {
    let navigate = useNavigate()
    const lock = (orientation = 'landscape') => {

        let de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();

            window.screen.orientation.lock(orientation);

        } else if (de.mozRequestFullScreen) {
            alert("hello 2")
            de.mozRequestFullscreen();
        } else if (de.webkitRequestFullscreen) {
            alert("hello 3")
            de.webkitRequestFullscreen();
        } else if (de.msRequestFullscreen) {
            alert("hello 4")
            de.msRequestFullscreen();
        }

        window.screen.orientation.lock(orientation);
    }
    const onRestart = () => {
        navigate('/')
        lock()
    }

    useEffect(() => {
        if (!props.videoEnd) {
            onRestart()
        }
    }, [])

    return (<VideoLayout backgroundImage={resultPageBackground}>

        {props.result === "passed" ? <Success /> : <Failed onRestart={onRestart} />}



    </VideoLayout >
    )
}

export default ResultPage