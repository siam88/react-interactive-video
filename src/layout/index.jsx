import VideoPage from '../pages/VideoPage';
import { useState } from 'react';
import LoginPage from '../pages/LoginPage';
import Loader from './../components/loader';
import { Routes, Route, } from "react-router-dom";
import TAndCPage from '../pages/T&CPage';
import ResultPage from './../pages/resultPage';

const Layout = () => {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)
    const [videoEnd, setVideoEnd] = useState(false)
    const [result, setResult] = useState()




    return (
        <>
            {loading && <Loader />}

            <Routes >
                {/* <Route path="/" element={<Navigate to="/home" />} /> */}
                <Route path="/" element={
                    auth ?
                        <VideoPage setVideoEnd={setVideoEnd} setResult={setResult} />
                        :
                        <LoginPage setAuth={setAuth} setLoading={setLoading} />
                } />

                <Route path="/result" element={<ResultPage videoEnd={videoEnd} result={result} />} />
                <Route path="/terms-and-conditions" element={<TAndCPage />} />
            </Routes>
        </>

    )
}

export default Layout