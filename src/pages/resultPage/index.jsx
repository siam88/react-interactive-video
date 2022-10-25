import React, { useEffect, useContext } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Failed from './failed'
import Success from './success';
import PageLayout from "./../../layout/PageLayout";
import { UserContext } from '../../contexts/quizContext';

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

            {location.state.result.result ? <Success /> : <Failed onRestart={onRestart} userInfo={location.state.userInfo} resultSubmission={location.state.result.resultSubmission} />}
        </PageLayout>
    )
}

export default ResultPage