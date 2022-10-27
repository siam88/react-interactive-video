import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Introbg from "../../../assets/all-images/Intro-Bg.jpg";
import robiLogo from "../../../assets/all-images/robi-logo.svg";
import playIcon from "../../../assets/all-images/play-btn.png";
import ball from "../../../assets/all-images/ball.png";
import ballWithMen from "../../../assets/all-images/ball-with-men.svg";
import khelaPaltabe from "../../../assets/all-images/khela-paltabe-robi.png";
import PageLayout from "../../../layout/PageLayout";
import { ResponseMsgFormatter, Lock, MobileCheck, CheckIOS } from "../../../utils";
import { QuizContext, UserContext } from "../../../contexts/quizContext";

const IntroPage = (props) => {
  const [instruction1, setInstruction1] = useState(false);

  const { setQuestions, setQuizAns, quizAns } = useContext(QuizContext);

  const { userInfo } = useContext(UserContext);




  useEffect(() => {
    const interval = setInterval(() => {
      setInstruction1((state) => !state);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const onStart = () => {
    // if (MobileCheck()) {
    //   // Lock()
    // }

    if (userInfo) {
      onHandleLogin()
      props.setIntro(false);

    } else {
      props.setIntro(false);

    }


  };



  const onHandleLogin = async () => {
    // e.preventDefault()
    props.setLoading(true);



    await axios
      .post(`${process.env.REACT_APP_SECRET_URL}/login`, userInfo)
      .then((res) => {
        if (res.data.statusCode === "400200") {
          Cookies.set(
            process.env.REACT_APP_GET_SECRET_TOKEN,
            res.data.data.token,
            {
              expires: res.data.data.expires_in / 86400,
            }
          );

          props.setAuth(true);
          props.setLoading(false);
          // toast.success(res.data.message)
          // onPlayVideo()
          onPlayVideo();
        } else {
          toast.error("Something went wrong");
          props.setAuth(false);
          props.setLoading(false);
        }
      })
      .catch((err) => {
        props.setLoading(false);
        toast.error(
          err.response.data.message
            ? ResponseMsgFormatter(err.response.data.message)
            : "Something went wrong"
        );
      });
  };
  const onPlayVideo = async () => {
    props.setLoading(true);
    const token = Cookies.get(process.env.REACT_APP_GET_SECRET_TOKEN);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    await axios
      .get(`${process.env.REACT_APP_SECRET_URL}/request/quiz`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.statusCode === "400200") {
          setQuestions(res.data.data.questions);
          setQuizAns({ ...quizAns, refId: res.data.data.refId });

          if (MobileCheck()) {
            if (CheckIOS()) {

            } else {
              Lock()
            }
          }
          props.setLoading(false);

          // toast.success("Video is playing")
          Cookies.set(
            process.env.REACT_APP_POST_SECRET_TOKEN,
            res.data.data.token,
            {
              expires: 864000,
            }
          );
          props.initialPlayer();

        } else {
          toast.error("Something went wrong");
          props.setLoading(false);
        }
      })
      .catch((err) => {
        props.setLoading(false);
        toast.error(
          err.response.data.message
            ? ResponseMsgFormatter(err.response.data.message)
            : "Something went wrong"
        );
      });
  };
  return (
    <>
      <PageLayout visible={props?.appState?.hideInstructions}>
        <div className="intro_bg">
          <img src={Introbg} alt="page background" loading="lazy" />
        </div>
        <div className="robi_logo">
          <img src={robiLogo} alt="robi logo" loading="lazy" />
        </div>
        <div className="initial_Play_btn" style={{ opacity: 1 }} onClick={() => onStart()}>
          <img src={playIcon} alt="i am tamim" loading="lazy" />
        </div>
        <div className="khelaPaltabe">
          <img src={khelaPaltabe} alt="" loading="lazy" />
        </div>
        {instruction1 ? (
          <>
            {/* ======== Bottom 1st content ======== */}
            <div className="bottom_content d-flex align-items-center ">
              <div className="ball_icon">
                <img src={ball} alt="" loading="lazy" />
              </div>
              <div className="text_content">
                <p className="mb-2">স্লাইড করে</p>
                <h3 className="heading">উপভোগ করুন এক নতুন এক্সপেরিয়েন্স</h3>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ======== Bottom 2st content ======== */}
            <div className="bottom_content d-flex align-items-center ">
              <div className="ball_with_men">
                <img src={ballWithMen} alt="" loading="lazy" />
              </div>
              <div className="text_content">
                <p className="mb-2">হটস্পটে ক্লিক করে</p>
                <h3 className="heading">জিতে নিন তামিমের সিগনেচারসহ ব্যাট</h3>
              </div>
            </div>
          </>
        )}
      </PageLayout>
    </>
  );
};

export default IntroPage;
