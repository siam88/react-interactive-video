import "../App.css";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
import { useState, useEffect, useRef } from "react";
import { BiPlay, BiPause, BiVolumeLow } from "react-icons/bi";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import instructionMsgImg from "../assets/Capture.PNG";
import playIcon from "../assets/playIcon.png";
import Loader from "./loader";

const TIMETOSHOW = 3;
function App() {
  const [playing, setPlaying] = useState(false);
  const [videoNode, setVideoNode] = useState();
  const [videoNode2, setVideoNode2] = useState();
  const [onPauseTimer, setOnPauseTimer] = useState(5);
  const [videoProgress, setVideoProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [playable, setPlayable] = useState(false);
  const [playable2, setPlayable2] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [instructionMsg, setInstructionMsg] = useState(true);
  const [loading, setLoading] = useState(false);

  const progressRef = useRef();

  //setting up the video to the state

  useEffect(() => {
    const video = document.getElementById("video_one");
    const video2 = document.getElementById("video_two");
    setVideoNode(video);
    setVideoNode2(video2);
  }, [instructionMsg, isAutoPlay, onPauseTimer]);

  //checking if video is ready or not
  useEffect(() => {
    if (videoNode && videoNode2) {
      //data loaded initially

      videoNode.addEventListener("loadeddata", (...args) => {
        if (videoNode.readyState >= 2) {
          setPlayable(true);
        }
      });
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        setIsAutoPlay(true);

        setPlayable2(true);
      }

      videoNode2.addEventListener("loadeddata", (...args) => {
        if (videoNode2.readyState >= 2) {
          setPlayable2(true);
        }
      });
    }
  }, [videoNode, videoNode2, playable, playable2]);

  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      if (playing) {
        if (videoNode && videoNode2) {
          const progress = document.querySelector(".progress");

          if (!videoNode.paused && !videoNode2.paused) {
            const scrubTime =
              (onPauseTimer / progress.offsetWidth) * videoNode.duration;
            videoNode.currentTime = scrubTime;
            videoNode2.currentTime = scrubTime;
          }
        }
      }
    }
  }, [playing, videoNode, videoNode2]);

  //check play event
  useEffect(() => {
    if (videoNode && videoNode2 && playable && playable2) {
      videoNode.addEventListener("waiting", (...args) => {
        setLoading(true);
        videoNode2.pause();
      });
      videoNode2.addEventListener("waiting", (...args) => {
        setLoading(true);
        videoNode.pause();
      });
      videoNode?.addEventListener("canplay", (...args) => {
        if (playable && playable2) {
          setLoading(false);
          videoNode2?.play();
        }
      });
      videoNode2?.addEventListener("canplay", (...args) => {
        if (playable && playable2) {
          setLoading(false);

          videoNode?.play();
        }
      });
    }
  }, [videoNode, videoNode2, playable, playable2, instructionMsg]);

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

  const progressHandler = (e) => {
    const progress = document.querySelector(".progress");
    // const videoTwo = document.getElementById("video_two");
    // console.log("progress==>", e.nativeEvent.offsetX);
    // if(offsetVal)
    const scrubTime =
      (e.nativeEvent.offsetX / progress.offsetWidth) * videoNode.duration;

    videoNode.currentTime = scrubTime;
    videoNode2.currentTime = scrubTime;
  };

  const volumeHandler = (e) => {
    setVolume(e.target.value);
  };

  const openModal = () => {
    setPlaying(false);
    setShowModal(true);
    const videos = document.querySelectorAll("video");

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setOnPauseTimer(videoNode.currentTime);
    }
    Array.from(videos).forEach((video) => {
      video.pause();

      setPlaying(false);
    });
  };
  const onCloseHandler = () => {
    setShowModal(false);
    setPlaying(true);
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setPlaying(true);
    }
    const videos = document.querySelectorAll("video");

    Array.from(videos).forEach((video) => {
      video.play();
      setPlaying(true);
    });
  };
  useEffect(() => {
    if (!instructionMsg) {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      } else {
        setTimeout(() => {
          playHandler();
        }, 3000);
      }
    }
  }, [instructionMsg, isAutoPlay]);
  // if (loader) {
  //   return <div style={{ background: "white" }}>Loading......</div>;
  // }
  const initialPlayer = () => {
    setInstructionMsg((prestate) => !prestate);
    setLoading(true);
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setIsAutoPlay(true);
      setTimeout(() => {
        setPlayable(true);
        setPlayable2(true);
        setPlaying(true);
        setLoading(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }

    // playHandler();
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {instructionMsg ? (
            <>
              <div className="col-md-12 mt-4 mb-4">
                <div className="video_wrapper mt-5">
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
              </div>
            </>
          ) : (
            <>
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

                  <ReactCompareSlider
                    onlyHandleDraggable={true}
                    itemOne={
                      <>
                        <video
                          playsInline
                          autoPlay={isAutoPlay}
                          muted
                          width={"100%"}
                          id="video_one"
                          onTimeUpdate={timeUpdateHandler}
                          onEnded={() => setPlaying(false)}
                          preload="auto"
                          onwaiting={() => {
                            console.log(" video ,i am waiting");
                          }}
                          onStalled={(e) => console.log("hello", e)}
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
                          muted
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
                  {loading && (
                    <div className="loader">
                      <Loader />
                    </div>
                  )}
                </div>
                <>
                  {!showModal && !loading && (
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
                          <BiVolumeLow style={{ color: "white" }} />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
