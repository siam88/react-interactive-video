import { useState, useContext } from 'react'
import playIcon from "../assets/icons/play.png";
import instructionMsgImg from "../assets/images/intro_page.gif";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { ErrorMsgFormatter } from '../utils';
import Loader from './../components/loader/index';
import { LoginContext } from '../contexts/questionContext';

const IntroPage = (props) => {

    const [loading, setLoading] = useState(false)
    const { setQuestions } = useContext(LoginContext)
    const onPlayVideo = async () => {
        setLoading(true)
        const token = Cookies.get(process.env.REACT_APP_SECRET_KEY);
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        await axios.get(`${process.env.REACT_APP_SECRET_URL}/request/quiz`, { headers: headers }
        ).then((res) => {
            if (res.data.statusCode === "400200") {
                setQuestions(res.data.data.questions)
                setLoading(false)
                props.initialPlayer()
                console.log(res.data.data.questions)
                // toast.success("Video is playing")

            } else {
                toast.error(
                    "Something went wrong"
                )
                setLoading(false)
            }
        }).catch((err) => {
            setLoading(false)
            toast.error(
                err.response.data.message
                    ? ErrorMsgFormatter(err.response.data.message)
                    : "Something went wrong"
            )
        }


        );
    }




    return (
        <>
            {loading && <Loader />}

            <div
                className="instruction_wrapper"
                style={
                    props.appState.hideInstructions
                        ? { opacity: 0, zIndex: 0 }
                        : { opacity: 1, zIndex: 1 }
                }
            >
                <img
                    style={{ width: "100%" }}
                    src={instructionMsgImg}
                    alt="instruction massage for Interactive video"
                />

                <div className="initial_Play_btn" style={{ opacity: 1 }}>
                    <img
                        src={playIcon}
                        alt="i am tamim"
                        onClick={() => onPlayVideo()}
                    />
                </div>
            </div>
        </>
    )
}

export default IntroPage