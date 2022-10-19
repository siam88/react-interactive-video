import React, { useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Failed from './failed'
import Success from './success';
import PageLayout from "./../../layout/PageLayout";


const ResultPage = (props) => {
    let navigate = useNavigate()
    let location = useLocation()

    const onRestart = () => {
        navigate('/')

    }

    useEffect(() => {
        if (location.state === null) {
            onRestart()
        }

    }, [])


    return (
        <PageLayout visible={false}>
            {location.state ? <Success /> : <Failed onRestart={onRestart} />}
        </PageLayout>
    )
}

export default ResultPage