import "../App.css";
import { useState, useEffect } from "react";
import Loader from "../components/loader";
import IntroPage from "../pages/IntroPage";
import CustomModal from "./../components/modals/index";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import HotSpots from "../components/hotSpot";
import ControlPanel from "../components/controlPanel";
import { findCurrentTimeToShow } from "./../helpers/helpers";
import VideoPlayer from "../components/videoPLayer";
import { QuizContext } from '../contexts/quizContext';
import { useNavigate } from "react-router-dom";

const VideoPage = (props) => {
    let navigate = useNavigate();

    const [playing, setPlaying] = useState(false);
    const [videoNode, setVideoNode] = useState();
    const [videoNode2, setVideoNode2] = useState();
    const [interactiveItem, setInteractiveItem] = useState();
    const [videoProgress, setVideoProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showInfo, setShowInfo] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [playable, setPlayable] = useState(false);
    const [playable2, setPlayable2] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState();
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
                optionId: ""
            },
            {
                topicId: "",
                questionId: "",
                startTime: "",
                optionId: ""
            },
            {
                topicId: "",
                questionId: "",
                startTime: "",
                optionId: ""
            },
            {
                topicId: "",
                questionId: "",
                startTime: "",
                optionId: ""
            }
        ]

    })
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
                // setIsAutoPlay(true);
                setPlayable2(true);

                setAppState({ ...appState, muted: true });
            }
            console.log({ videoNode });
            videoNode2.addEventListener("loadeddata", (...args) => {
                if (videoNode2.readyState >= 2) {
                    setPlayable2(true);

                }
            });
        }
    }, [videoNode, videoNode2, playable, playable2]);


    useEffect(() => {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            if (videoNode || videoNode2) {
                // videoNode.currentTime = 0;
                // videoNode2.currentTime = 0;
                initialIOSProgress();

            }
        }
    }, [isAutoPlay]);

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
            // if (Math.floor(videoNode.currentTime) >= selectedNode.timeToShow) {

            // }
            setShowInfo(true);
            setInteractiveItem(selectedNode);
            if (Math.floor(videoNode.currentTime) >= selectedNode.timeToHide) {
                setShowInfo(false);
                setInteractiveItem(null);
            }
        }

        if (percent === 100) {
            props.setVideoEnd(true)
            navigate(`/result`);
            unLock()
        }
    };
    const unLock = () => {
        window.screen.orientation.unlock();
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullscreen) {
            document.mozCancelFullscreen();
        } else if (document.msExitFullscreen) {
            document.mozCancelFullscreen();
        }
    }
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
            // alert("hello")
        }
    };
    const progressHandler = (e = 20) => {

        const progress = document.querySelector(".progress");
        const videoTwo = document.getElementById("video_two");
        // console.log("progress==>", e.nativeEvent.offsetX);

        const scrubTime =
            (e.nativeEvent.offsetX / progress.offsetWidth) * videoNode.duration;
        videoNode.currentTime = scrubTime;
        videoTwo.currentTime = scrubTime;

    };
    const initialIOSProgress = () => {

        const progress = document.querySelector(".progress");
        const videoTwo = document.getElementById("video_two");
        // console.log("progress==>", e.nativeEvent.offsetX);


        const scrubTime =
            (10 / progress.offsetWidth) * videoNode.duration;
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
    const initialPlayer = () => {
        setLoading(true);
        setAppState({ ...appState, hideInstructions: true });
        setTimeout(() => {
            playHandler();
            setLoading(false);
        }, 2000);
    };

    return (
        <QuizContext.Provider value={{ questions, setQuestions, quizAns, setQuizAns }}>
            <div className="App" style={{ backgroundColor: "#28282b", height: "100vh" }}>
                <Container>

                    <Row className="justify-content-md-center">
                        <Col xl={10} className="mt-4 mb-4">
                            <div className="video_wrapper ">

                                {showModal && interactiveItem && (
                                    <CustomModal
                                        showModal={showModal}
                                        setResult={props.setResult}
                                        onCloseHandler={onCloseHandler}
                                        interactiveItem={interactiveItem}
                                    />
                                )}

                                {loading && <Loader />}

                                <IntroPage
                                    initialPlayer={initialPlayer}
                                    appState={appState}

                                    questions={questions}
                                />

                                <VideoPlayer
                                    isAutoPlay={isAutoPlay}
                                    appState={appState}
                                    timeUpdateHandler={timeUpdateHandler}
                                    setPlaying={setPlaying}
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
}

export default VideoPage;
