import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import resultPageBackground from '../../assets/images/resultPageBackground.png'
import Failed from './failed'
import Success from './success';
import VideoLayout from './../../layout/videoLayout/index';

const ResultPage = (props) => {
    let navigate = useNavigate()

    const onRestart = () => {
        navigate('/')
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