import VideoPage from '../pages/VideoPage';
import { CheckIOS } from '../utils';

import { useState, useRef } from 'react';
import LoginPage from '../pages/LoginPage';
import Loader from './../components/loader';


const Layout = () => {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmitResult = () => {
        console.log("i am submitted")

    }

    return (
        <div >
            {loading && <Loader />}

            {
                auth ?
                    <VideoPage onSubmitResult={onSubmitResult} />
                    :
                    <LoginPage setAuth={setAuth} setLoading={setLoading} />
            }
        </div>
    )
}

export default Layout