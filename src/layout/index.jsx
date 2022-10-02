import VideoPage from '../pages/VideoPage';
import { CheckIOS } from '../utils';

import { useState, useRef } from 'react';
import LoginPage from '../pages/LoginPage';
import Loader from './../components/loader';
import { Routes, Route, Navigate } from "react-router-dom";
import TAndCPage from './../pages/T&CPage/T&CPage';

const Layout = () => {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)


    const onSubmitResult = () => {
        console.log("i am submitted")

    }

    return (
        <>
            {loading && <Loader />}

            <Routes >
                {/* <Route path="/" element={<Navigate to="/home" />} /> */}
                <Route path="/" element={
                    auth ?
                        <VideoPage onSubmitResult={onSubmitResult} />
                        :
                        <LoginPage setAuth={setAuth} setLoading={setLoading} />
                } />

                <Route path="/terms-and-conditions" element={<TAndCPage />} />
            </Routes>
        </>

    )
}

export default Layout