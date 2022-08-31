import "./App.css";
import { ReactCompareSlider } from "react-compare-slider";
import { useState, useEffect } from "react";
import { BiPlay, BiPause, BiVolumeLow } from "react-icons/bi";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const TIMETOSHOW = 3;
function App() {
  const [playing, setPlaying] = useState(false);
  const [videoNode, setVideoNode] = useState();
  const [videoNode2, setVideoNode2] = useState();
  const [videoProgress, setVideoProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [readyState1, setReadyState1] = useState(false);
  const [readyState2, setReadyState2] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [videoTime2, setVideoTime2] = useState(0);
  useEffect(() => {
    const video = document.getElementById("video_one");
    const video2 = document.getElementById("video_two");
    setVideoNode(video);
    setVideoNode2(video2);
    if (videoTime > videoTime2) {
      videoNode.pause();
      video2.addEventListener("canplay", (...args) => {
        videoNode.play();
        console.log("video2 args canplay fired=======", args);
      });
    } else if (videoTime2 > videoTime) {
      videoNode2.pause();
      video.addEventListener("canplay", (...args) => {
        videoNode2.play();
        console.log("video args canplay fired=======", args);
      });
    }
    // video.addEventListener("loadstart", (...args) => {
    //   console.log("args loadstart fired=======", args);
    // });
    // video.addEventListener("durationchange", (...args) => {
    //   console.log("args durationchange fired=======", args);
    // });
    // video.addEventListener("loadedmetadata", (...args) => {
    //   console.log("args loadedmetadata fired=======", args);
    // });
    // video.addEventListener("loadeddata", (...args) => {
    //   console.log("args loadeddata fired=======", args);
    // });
    // video.addEventListener("progress", (...args) => {
    //   console.log("args progress fired=======", args);
    // });
    console.log("video playing time =>", video.currentTime);
    console.log("video2 playing time =>", video2.currentTime);
    // video.addEventListener("canplay", (...args) => {
    //   console.log("video args canplay fired=======", args);
    // });
    // video2.addEventListener("canplay", (...args) => {
    //   console.log("video2 args canplay fired=======", args);
    // });
    // video.addEventListener("canplaythrough", (...args) => {
    //   console.log("args canplaythrough fired=======", args);
    // });
    video.addEventListener("loadeddata", (...args) => {
      // console.log("args canplay fired=======",args)

      if (video.readyState >= 2) {
        setReadyState1(true);
      }
    });
    video2.addEventListener("loadeddata", () => {
      if (video2.readyState >= 2) {
        setReadyState2(true);
      }
    });
    if (video.networkState === video.NETWORK_LOADING) {
      // console.log("The user agent is actively trying to download data.");
    }
    console.log(
      "video networkState and NETWORK_LOADING=>",
      video.networkState,
      video.NETWORK_LOADING
    );
    console.log(
      "readyState & HAVE_FUTURE_DATA",
      video.HAVE_FUTURE_DATA,
      video.readyState
    );
    if (video.readyState < video.HAVE_FUTURE_DATA) {
      // console.log("There is not enough data to keep playing from this point");
    }
  }, [readyState1]);

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    Array.from(videos).forEach((video) => {
      video.volume = volume;
    });
  }, [volume]);

  useEffect(() => {}, [videoTime, videoTime2]);

  const timeUpdateHandler = (e) => {
    const percent = (videoNode.currentTime / videoNode.duration) * 100;
    console.log("videoNode ~~~~~~~~~>", videoNode.currentTime.toFixed(4));
    setVideoTime(videoNode.currentTime.toFixed(2));
    setVideoProgress(percent);
    if (Math.floor(videoNode.currentTime) >= TIMETOSHOW) {
      setShowInfo(true);
    }
  };
  const timeUpdateHandler2 = (e) => {
    // videoNode2.currentTime ;
    console.log("videoNode2 ==========>", videoNode2.currentTime.toFixed(4));
    setVideoTime2(videoNode2.currentTime.toFixed(2));

    // setVideoProgress(percent);
    // if (Math.floor(videoNode2.currentTime) >= TIMETOSHOW) {
    //   setShowInfo(true);
    // }
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
  };

  const progressHandler = (e) => {
    const progress = document.querySelector(".progress");
    const videoTwo = document.getElementById("video_two");
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
  // video.addEventListener("loadeddata", () => {
  //   if (video.readyState >= 2) {
  //     video.play();
  //   }
  // });
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
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                        target="_blank"
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
                      width={"100%"}
                      id="video_one"
                      onTimeUpdate={timeUpdateHandler}
                      onEnded={() => setPlaying(false)}
                      preload="auto"
                      onStalled={(e) =>
                        console.log("+++++++++hello i am video1 stalled", e)
                      }
                      // onCanPlayThrough={(e) => console.log("helllo", e)}
                      // autoPlay={readyState1}
                      // muted="muted"
                    >
                      <source src="/videos/Tamim 5.mp4" type="video/mp4" />
                    </video>
                  </>
                }
                itemTwo={
                  <>
                    <video
                      width={"100%"}
                      onTimeUpdate={timeUpdateHandler2}
                      id="video_two"
                      preload="auto"
                      // autoPlay={readyState2}
                      // muted="muted"
                      onStalled={(e) =>
                        console.log("+++++++++hello i am video2 stalled", e)
                      }
                    >
                      <source src="/videos/Tamim 6.mp4" type="video/mp4" />
                    </video>{" "}
                  </>
                }
                position={50}
              />

              <div
                className="img_btn"
                style={{ opacity: showInfo === true ? 1 : 0 }}
                onClick={openModal}
              >
                <img src="/image/tamim.png" />
              </div>
            </div>
            <>
              {!showModal && (
                <div className="control_panel">
                  <div className="progress" onClick={progressHandler}>
                    <div
                      className="progress__filled"
                      style={{ flexBasis: `${videoProgress}%` }}
                    ></div>
                  </div>
                  <div className="play_icon">
                    {playing ? (
                      <BiPause
                        onClick={playHandler}
                        style={{ color: "white" }}
                      />
                    ) : (
                      <>
                        {readyState1 && readyState2 && (
                          <BiPlay
                            onClick={playHandler}
                            style={{ color: "white" }}
                          />
                        )}
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
        </div>
      </div>
    </div>
  );
}

export default App;
