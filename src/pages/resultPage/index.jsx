import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import resultPageBackground from '../../assets/images/resultPageBackground.png'
import Failed from './failed'
import Success from './success';

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

    return (<>
        <div style={{
            backgroundImage: `url(${resultPageBackground})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",


        }}>
            {props.result === "passed" ? <Success /> : <Failed onRestart={onRestart} />}


        </div>
    </>
    )
}

export default ResultPage