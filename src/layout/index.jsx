import React from 'react'
import VideoPage from '../pages/VideoPage';
import { useState } from 'react';
import LoginPage from '../pages/LoginPage';
import Loader from './../components/loader';
import { Routes, Route, } from "react-router-dom";
import TAndCPage from '../pages/T&CPage';
import ResultPage from './../pages/resultPage';
import Home from './../pages/home';

const Layout = () => {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)
    const [videoEnd, setVideoEnd] = useState(false)
    const [result, setResult] = useState()

    return (
        <>
           <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<ResultPage />} />
                <Route path="/terms-and-conditions" element={<TAndCPage />} />
            </Routes>
        </>

    )
}

export default Layout