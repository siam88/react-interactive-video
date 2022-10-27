import { useState, useContext, useEffect } from "react";
import Loader from "../../components/loader";
import IntroPage from "./introPage/IntroPage";
import LoginPage from "./LoginPage";
import CustomModal from "../../components/modals";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import HotSpots from "../../components/hotSpot";
import ControlPanel from "../../components/controlPanel";
import { findCurrentTimeToShow } from "../../helpers/helpers";
import TermsAndCondition from '../home/T&CPage'
import { QuizContext } from "../../contexts/quizContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../../App.css";
import ballImage from "../../assets/all-images/ball.png";
import { UnLock, checkFullScreen } from '../../utils'
import {
  ReactCompareSlider,

} from "react-compare-slider";
import { UserContext } from "../../contexts/quizContext";

const VideoPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const { userInfo } = useContext(UserContext);
  const [playing, setPlaying] = useState(false);
  const [videoNode, setVideoNode] = useState();
  const [videoNode2, setVideoNode2] = useState();
  const [videoProgress, setVideoProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [playable, setPlayable] = useState(false);
  const [playable2, setPlayable2] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [fullScreen, setFullScreen] = useState(false);
  const [interactiveItem, setInteractiveItem] = useState();
  const [user, setUser] = useState()
  const [result, setResult] = useState({
    resultSubmission: false,
    result: false
  });
  const [intro, setIntro] = useState(true);
  const [auth, setAuth] = useState(false);

  const [appState, setAppState] = useState({
    hideInstructions: false,
    muted: true,
  });
  const [quizAns, setQuizAns] = useState({
    refId: "",
    questions: [
      {
        topicId: "",
        questionId: "",
        startTime: "",
        optionId: "",
      },
      {
        topicId: "",
        questionId: "",
        startTime: "",
        optionId: "",
      },
      {
        topicId: "",
        questionId: "",
        startTime: "",
        optionId: "",
      },
      {
        topicId: "",
        questionId: "",
        startTime: "",
        optionId: "",
      },
    ],
  });
  //setting up the video to the state

  useEffect(() => {
    const video = document.getElementById("video_one");
    const video2 = document.getElementById("video_two");

    setVideoNode(video);
    setVideoNode2(video2);

    // initializer();
  }, []);

  //checking if video is ready or not
  useEffect(() => {
    if (videoNode && videoNode2) {
      //data loaded initially
      setAppState({ ...appState, muted: false });
      videoNode.addEventListener("loadeddata", (...args) => {
        if (videoNode.readyState >= 2) {
          setPlayable(true);
        }
      });
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        setIsAutoPlay(true);
        setPlayable2(true);
        setAppState({ ...appState, muted: true });
      }

      videoNode2.addEventListener("loadeddata", (...args) => {
        if (videoNode2.readyState >= 2) {
          setPlayable2(true);
        }
      });
    }
  }, [videoNode, videoNode2, playable, playable2]);

  const initialPlayer = () => {
    setLoading(true);
    setAppState({ ...appState, hideInstructions: true });

    setTimeout(() => {
      playHandler();
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      if (videoNode && videoNode2) {
        // videoNode.currentTime = 0;
        // videoNode2.currentTime = 0;
        progressHandler();
      }
    }
  }, []);

  //check play event
  useEffect(() => {
    if (videoNode && videoNode2 && playable && playable2) {
      videoNode.addEventListener("waiting", (...args) => {
        videoNode2.pause();
        setLoading(true);
        setAppState({ ...appState, hideInstructions: true });
      });
      videoNode2.addEventListener("waiting", (...args) => {
        videoNode.pause();
        setLoading(true);
        setAppState({ ...appState, hideInstructions: true });
      });
      videoNode?.addEventListener("canplay", (...args) => {
        if (playable && playable2) {
          videoNode2?.play();
          setLoading(false);
          setPlaying(true);
          setAppState({ ...appState, hideInstructions: true });
        }
      });
      videoNode2?.addEventListener("canplay", (...args) => {
        // setPlayable2(true);
        if (playable && playable2) {
          videoNode?.play();
          setPlaying(true);
          setLoading(false);
          setAppState({ ...appState, hideInstructions: true });
        }
      });
    }
  }, [videoNode, videoNode2, playable, playable2]);

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    Array.from(videos).forEach((video) => {
      video.volume = volume;
    });
  }, [volume]);

  const timeUpdateHandler = (e) => {
    const percent = (videoNode.currentTime / videoNode.duration) * 100;

    setVideoProgress(percent);
    let selectedNode = findCurrentTimeToShow(Math.floor(videoNode.currentTime));
    if (selectedNode) {

      setShowInfo(true);
      setInteractiveItem(selectedNode);
      if (Math.floor(videoNode.currentTime) >= selectedNode.timeToHide) {
        setShowInfo(false);
        setInteractiveItem(null);
      }
    }

    if (percent === 100) {
      // if (result.resultSubmission) {
      //   navigate("/result", { state: result.result });
      // }

      navigate("/result", {
        state: {
          result: result,
          userInfo: user
        }
      });
      if (checkFullScreen) {
        UnLock()
      }
    }

  };

  const playHandler = () => {
    setAppState({ ...appState, hideInstructions: true });
    const videos = document.querySelectorAll("video");
    Array.from(videos).forEach((video) => {
      if (video.paused) {
        video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
    });
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setIsAutoPlay((prevState) => !prevState);
    }
  };
  const progressHandler = (e = 5) => {
    const progress = document.querySelector(".progress");
    const videoTwo = document.getElementById("video_two");
    const scrubTime =
      (e.nativeEvent.offsetX / progress.offsetWidth) * videoNode.duration;
    videoNode.currentTime = scrubTime;
    videoTwo.currentTime = scrubTime;
  };
  const initialIOSProgress = () => {
    const progress = document.querySelector(".progress");
    const videoTwo = document.getElementById("video_two");
    // console.log("progress==>", e.nativeEvent.offsetX);

    const scrubTime = (10 / progress.offsetWidth) * videoNode.duration;
    videoNode.currentTime = scrubTime;
    videoTwo.currentTime = scrubTime;
  };
  const volumeHandler = (e) => {
    setVolume(e.target.value);
  };
  const openModal = () => {
    setShowModal(true);
    const videos = document.querySelectorAll("video");
    Array.from(videos).forEach((video) => {
      video.pause();
      setPlaying(false);
    });
  };
  const onCloseHandler = () => {
    setShowModal(false);
    const videos = document.querySelectorAll("video");
    Array.from(videos).forEach((video) => {
      video.play();
      setPlaying(true);
    });
  };


  return (
    <QuizContext.Provider
      value={{
        questions,
        fullScreen,
        setFullScreen,
        setQuestions,
        quizAns,
        setQuizAns,
      }}
    >
      <div
        className="main_bg_content"

      >
        <Container style={{ height: "100%" }}>
          <Row
            className="justify-content-center"
            style={{ height: "100%", alignItems: "center" }}
          >
            <Col
              xl={intro || !auth || (showModal && interactiveItem) ? 12 : 11}
              sm={intro || !auth || (showModal && interactiveItem) ? 12 : 11}
              xs={intro || !auth || (showModal && interactiveItem) ? 12 : 11}
              md={intro || !auth || (showModal && interactiveItem) ? 12 : 10}

            >

              <div className="video_wrapper ">

                {showModal && interactiveItem && (
                  <CustomModal
                    showModal={showModal}
                    setResult={setResult}
                    onCloseHandler={onCloseHandler}
                    interactiveItem={interactiveItem}
                    result={result}
                  />
                )}

                {loading && <Loader />}

                <IntroPage
                  appState={appState}
                  setIntro={setIntro}
                  userInfo={location?.state?.userInfo}
                  initialPlayer={initialPlayer}
                  setLoading={setLoading}
                  setAuth={setAuth}
                />
                <TermsAndCondition appState={appState} />

                {!userInfo && !intro && !auth && (
                  <LoginPage
                    setUser={setUser}
                    initialPlayer={initialPlayer}
                    appState={appState}
                    setIntro={setIntro}
                    setLoading={setLoading}
                    setAuth={setAuth}

                  />
                )}
                <ReactCompareSlider
                  onlyHandleDraggable={true}
                  handle={
                    <>
                      <div className="divider">
                        <div className='ball_controller'>
                          <img src={ballImage} alt="" className="ball" loading="lazy" />
                        </div>

                      </div>
                    </>
                  }
                  // handle={
                  //   // <ReactCompareSliderHandle
                  //   //   buttonStyle={{
                  //   //     backdropFilter: undefined,
                  //   //     background: "green",
                  //   //     border: 1,
                  //   //     height: "0",

                  //   //     color: "yellow",
                  //   //   }}
                  //   //   linesStyle={{
                  //   //     background: "green",
                  //   //   }}
                  //   // />
                  //   <div
                  //     style={{
                  //       display: "grid",
                  //       height: "100%",
                  //       placeContent: "center",
                  //     }}
                  //   >
                  //     <button
                  //       style={{
                  //         all: "unset",
                  //         borderRadius: "50%",
                  //         fontSize: 50,
                  //       }}
                  //     >
                  //       💥
                  //     </button>
                  //   </div>
                  // }
                  itemOne={
                    <>
                      <video
                        playsInline
                        autoPlay={isAutoPlay}
                        muted={appState.muted}
                        width={"100%"}
                        id="video_one"
                        onTimeUpdate={timeUpdateHandler}
                        onEnded={() => setPlaying(false)}
                        preload="auto"
                        onwaiting={() => {
                          // console.log(" video ,i am waiting");
                        }}
                        onStalled={(e) => console.log("hello", e)}
                      // onCanPlayThrough={(e) => console.log("helllo", e)}
                      // autoPlay={readyState1}
                      // muted="muted"
                      >
                        <source
                          src="https://d2uz5qswi21q1o.cloudfront.net/bts/5mb_Chroma.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </>
                  }
                  itemTwo={
                    <>
                      <video
                        autoPlay={isAutoPlay}
                        muted={appState.muted}
                        playsInline
                        width={"100%"}
                        id="video_two"
                        preload="auto"
                        // autoPlay={readyState2}
                        // muted="muted"
                        onwaiting={() => {
                          // console.log(" video 2,i am waiting");
                        }}
                      >
                        <source
                          src="https://d2uz5qswi21q1o.cloudfront.net/bts/5mb_tvc.mp4"
                          type="video/mp4"
                        />
                      </video>{" "}
                    </>
                  }
                />

                {showInfo && interactiveItem && (
                  <HotSpots
                    showInfo={showInfo}
                    openModal={openModal}
                    interactiveItem={interactiveItem}
                  />
                )}
              </div>

              {!showModal && appState.hideInstructions && !loading && (
                <ControlPanel
                  progressHandler={progressHandler}
                  videoProgress={videoProgress}
                  playable={playable}
                  playable2={playable2}
                  playing={playing}
                  playHandler={playHandler}
                  appState={appState}
                  setAppState={setAppState}
                  volume={volume}
                  setVolume={setVolume}
                  volumeHandler={volumeHandler}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </QuizContext.Provider>
  );
};

export default VideoPage;
