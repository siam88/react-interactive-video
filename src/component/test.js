import "../App.css";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { useState, useEffect, useRef } from "react";
import { BiPlay, BiPause, BiVolumeLow, BiVolumeMute } from "react-icons/bi";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import instructionMsgImg from "../assets/Capture.PNG";
import playIcon from "../assets/playIcon.png";
import Loader from "./loader";

const TIMETOSHOW = 3;
function App() {
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
  const [appState, setAppState] = useState({
    hideInstructions: false,
    muted: true,
  });
  //setting up the video to the state
  const progressRef = useRef();
  useEffect(() => {
    const video = document.getElementById("video_one");
    const video2 = document.getElementById("video_two");

    setVideoNode(video);
    setVideoNode2(video2);
    // initializer();
  }, []);
  // const initializer = async () => {
  //   setLoader(true);

  //   await preloadVideo(
  //     "https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_32.mp4"
  //   );

  //   await preloadVideo(
  //     "https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_12.mp4"
  //   );

  //   setLoader(false);
  // };
  // const preloadVideo = async (src) => {
  //   const res = await fetch(src);
  //   const blob = await res.blob();

  //   return URL.createObjectURL(blob);
  // };

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
      console.log({ videoNode });
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
    if (Math.floor(videoNode.currentTime) >= TIMETOSHOW) {
      setShowInfo(true);
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
    console.log("progress==>", e.nativeEvent.offsetX);
    const scrubTime =
      (e.nativeEvent.offsetX / progress.offsetWidth) * videoNode.duration;
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
  // if (loader) {
  //   return <div style={{ background: "white" }}>Loading......</div>;
  // }
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-4 mb-4">
            <div className="video_wrapper mt-5">
              <div
                className="modal_one"
                style={{
                  zIndex: showModal ? 10000 : 0,
                  opacity: showModal ? 1 : 0,
                }}
              >
                <div className="close_btn">
                  <button onClick={onCloseHandler}>
                    Back To
                    <br /> Video
                  </button>
                </div>

                <div className="social_icons">
                  <ul>
                    <li>
                      <a
                        href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTwitter />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {loading && (
                <div className="loader" style={{ opacity: 1, zIndex: 1 }}>
                  <Loader />
                </div>
              )}
              <div
                className="instruction_wrapper"
                style={
                  appState.hideInstructions
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
                    onClick={initialPlayer}
                  />
                </div>
              </div>
              {/* {loading && (
                <div className="loader" style={{ opacity: 1 }}>
                  <Loader />
                </div>
              )} */}

              <ReactCompareSlider
                onlyHandleDraggable={true}
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
                        console.log(" video ,i am waiting");
                      }}
                      onStalled={(e) => console.log("hello", e)}
                      // onCanPlayThrough={(e) => console.log("helllo", e)}
                      // autoPlay={readyState1}
                      // muted="muted"
                    >
                      <source
                        src="https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_32.mp4"
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
                        console.log(" video 2,i am waiting");
                      }}
                    >
                      <source
                        src="https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_12.mp4"
                        type="video/mp4"
                      />
                    </video>{" "}
                  </>
                }
              />

              <div
                className="img_btn"
                style={{ opacity: showInfo === true ? 1 : 0 }}
                onClick={openModal}
              >
                <img src="/image/tamim.png" alt="i am tamim" />
              </div>
            </div>
            <>
              {!showModal && appState.hideInstructions && !loading && (
                <div className="control_panel">
                  <div
                    className="progress"
                    onClick={progressHandler}
                    ref={progressRef}
                  >
                    <div
                      className="progress__filled"
                      style={{ flexBasis: `${videoProgress}%` }}
                    ></div>
                  </div>
                  <div className="play_icon">
                    {playable && playable2 && playing ? (
                      <BiPause
                        onClick={playHandler}
                        style={{ color: "white" }}
                      />
                    ) : (
                      <>
                        <BiPlay
                          onClick={playHandler}
                          style={{ color: "white" }}
                        />
                      </>
                    )}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {appState.muted ? (
                        <BiVolumeMute
                          style={{ color: "white" }}
                          onClick={() => {
                            setAppState({ ...appState, muted: false });
                            setVolume(1);
                          }}
                        />
                      ) : (
                        <BiVolumeLow
                          style={{ color: "white" }}
                          onClick={() => {
                            setAppState({ ...appState, muted: true });
                            setVolume(0);
                          }}
                        />
                      )}

                      <input
                        type="range"
                        className="slider"
                        id="custom_range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={volumeHandler}
                      ></input>
                    </div>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
