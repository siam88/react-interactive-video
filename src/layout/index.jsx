import React, { useEffect } from 'react'
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
    useEffect(() => {
        // alert(window.screen.orientation.type)
        // console.log(window.orientation)

        // window.screen.orientation.lock("landscape")
        // if (window.matchMedia("(orientation: portrait)").matches) {
        //     // Portrait orientation
        //     alert("Portrait")
        // } else {
        //     // Landscape orientation
        //     alert("Landscape")

        // }
        // window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
        // console.log({ e })
        // const portrait = e.matches
        // if (portrait) {
        //     alert("Portrait")
        //     lock()
        // } else {
        //     // Landscape orientation
        //     alert("Landscape")
        //     lock()

        // }
        // })
        // alert(window.screen.orientation.type)
        // let _orn = (window.screen.msOrientation || window.screen.orientation || window.screen.mozOrientation).type
        // alert(_orn)

    }, [])



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