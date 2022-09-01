import "../App.css";
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
  const [playable, setPlayable] = useState(false);
  const [playable1, setPlayable1] = useState(false);

  useEffect(() => {
    const video = document.getElementById("video_one");
    const video2 = document.getElementById("video_two");

    setVideoNode(video);
    setVideoNode2(video2);

    //waiting func
    videoNode?.addEventListener("waiting", (...args) => {
      console.log("videoNode onwaiting fired=======", args[0]);
      videoNode2?.pause();
      setReadyState1(false);
      setReadyState2(false);
    });
    videoNode2?.addEventListener("waiting", (...args) => {
      console.log("videoNode2 onwaiting fired=======", args[0]);
      videoNode?.pause();
      setReadyState1(false);
      setReadyState2(false);
    });

    //play func
    videoNode?.addEventListener("canplay", (...args) => {
      console.log("videoNode canplay fired=======", readyState1, readyState2);
      setReadyState1(true);
      if (readyState1 && readyState2) {
        videoNode2?.play();
      }
      // videoNode2.currentTime = videoNode.currentTime + 0.005;
    });
    videoNode2?.addEventListener("canplay", (...args) => {
      console.log("videoNode2 canplay fired=======", readyState1, readyState2);

      setReadyState2(true);
      if (readyState1 && readyState2) {
        videoNode?.play();
      }
    });

    console.log("video.HAVE_CURRENT_DATA", video.HAVE_CURRENT_DATA);

    video.addEventListener("loadeddata", (...args) => {
      if (video.readyState >= 4) {
        setPlayable(true);
        setPlayable1(true);
      }
    });
    video2.addEventListener("loadeddata", (...args) => {
      if (video2.readyState >= 4) {
        setPlayable1(true);
        setReadyState2(true);
      }
    });
    // if (video.networkState === video.NETWORK_LOADING) {
    //   console.log("The user agent is actively trying to download data.");
    // }
    // console.log("video=>", video.networkState, video.NETWORK_LOADING);
    // if (video.readyState < video.HAVE_FUTURE_DATA) {
    //   console.log("There is not enough data to keep playing from this point");
    // }
  }, [readyState1, readyState2]);

  // useEffect(() => {
  //   if (playing) {
  //     console.log("node", videoNode?.readyState);
  //     console.log("node2", videoNode2?.readyState);
  //     if (videoNode?.readyState >= 2 && videoNode2?.readyState >= 2) {
  //       videoNode?.play();
  //       videoNode2?.play();
  //     } else {
  //       videoNode?.pause();
  //       videoNode2?.pause();
  //     }
  //   }
  // });

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
                      onwaiting={() => {
                        console.log(" video ,i am waiting");
                      }}
                      onStalled={(e) => console.log("hello", e)}
                      // onCanPlayThrough={(e) => console.log("helllo", e)}
                      // autoPlay={readyState1}
                      // muted="muted"
                    >
                      <source
                        src="https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_3.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </>
                }
                itemTwo={
                  <>
                    <video
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
                        src="https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_1.mp4"
                        type="video/mp4"
                      />
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
                        {playable1 && playable1 && (
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
