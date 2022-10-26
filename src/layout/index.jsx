import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import TAndCPage from '../pages/home/T&CPage';
import ResultPage from './../pages/resultPage';
import Home from './../pages/home';


const Layout = () => {



    return (
        <>
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<ResultPage />} />
                {/* <Route path="/terms-and-conditions" element={<TAndCPage />} /> */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </>

    )
}

export default Layout