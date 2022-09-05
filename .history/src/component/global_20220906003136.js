import "../App.css";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
} from "react-compare-slider";
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
  const [playable, setPlayable] = useState(false);
  const [playable2, setPlayable2] = useState(false);

  //setting up the video to the state
  useEffect(() => {
    const video = document.getElementById("video_one");
    const video2 = document.getElementById("video_two");

    setVideoNode(video);
    setVideoNode2(video2);
  }, [videoNode, videoNode2]);

  //checking if video is ready or not
  useEffect(() => {
    if (videoNode && videoNode2) {
      //data loaded initially

      videoNode.addEventListener("loadeddata", (...args) => {
        if (videoNode.readyState >= 2) {
          setPlayable(true);
        }
      });

      videoNode2.addEventListener("loadeddata", (...args) => {
        if (videoNode2.readyState >= 2) {
          setPlayable2(true);
        }
      });
      videoNode2.addEventListener("loadedmetadata", (...args) => {
        if (videoNode2.readyState >= 2) {
          setPlayable2(true);
        }
        alert(`i am loadedmetadata ${videoNode2.readyState}`);
      });
    }
  }, [videoNode, videoNode2, playable, playable2]);

  //check play event
  useEffect(() => {
    if (videoNode && videoNode2 && playable && playable2) {
      videoNode.addEventListener("waiting", (...args) => {
        videoNode2.pause();
      });
      videoNode2.addEventListener("waiting", (...args) => {
        videoNode.pause();
      });
      videoNode?.addEventListener("canplay", (...args) => {
        setPlayable(true);
        if (playable && playable2) {
          videoNode2?.play();
        }
        alert("i am called video 1")
      });
      videoNode2?.addEventListener("canplay", (...args) => {
        // setPlayable2(true);
        if (playable && playable2) {
          videoNode?.play();
        alert("i am called video 2")

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
    const videos = document.querySelectorAll("video");
    // if (playable && playable2) {
      
    // } else {
    //   alert("video is not ready yet");
    // }
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
  // console.log("playable=>", playable, "playable 2=>", playable2);
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
              <ReactCompareSlider
                onlyHandleDraggable={true}
                handle={
                  // <ReactCompareSliderHandle
                  //   buttonStyle={{
                  //     backdropFilter: undefined,
                  //     background: "green",
                  //     border: 1,
                  //     height: "0",

                  //     color: "yellow",
                  //   }}
                  //   linesStyle={{
                  //     background: "green",
                  //   }}
                  // />
                  <div
                    style={{
                      display: "grid",
                      height: "100%",
                      placeContent: "center",
                    }}
                  >
                    <button
                      style={{
                        all: "unset",
                        borderRadius: "50%",
                        fontSize: 50,
                      }}
                    >
                      💥
                    </button>
                  </div>
                }
                itemOne={
                  <>
                    <video
                      playsInline
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
              {!showModal && (
                <div className="control_panel">
                  <div className="progress" onClick={progressHandler}>
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
        </div>
      </div>
    </div>
  );
}

export default App;
