import "../App.css";
import { ReactCompareSlider } from "react-compare-slider";
import { useState, useEffect } from "react";
import { BiPlay, BiPause, BiVolumeLow } from "react-icons/bi";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { ImInfo } from "react-icons/im";
import { AiFillCloseCircle } from "react-icons/ai";
import { Modal } from "react-bootstrap";

const TIMETOSHOW = 3;
function App() {
  const [playing, setPlaying] = useState(false);
  const [videoNode, setVideoNode] = useState();
  const [videoProgress, setVideoProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const video = document.getElementById("video_one");

    setVideoNode(video);
  }, []);

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    Array.from(videos).forEach((video) => {
      video.volume = volume;
    });
  }, [volume]);

  const timeUpdateHanlder = (e) => {
    const percent = (videoNode.currentTime / videoNode.duration) * 100;

    setVideoProgress(percent);
    if (Math.floor(videoNode.currentTime) >= TIMETOSHOW) {
      setShowInfo(true);
    }
  };

  const playHanlder = () => {
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
                      onTimeUpdate={timeUpdateHanlder}
                      onEnded={() => setPlaying(false)}
                      preload="auto"
                      playsInline
                    >
                      <source src="/videos/Tamim 5.mp4" type="video/mp4" />
                    </video>
                  </>
                }
                itemTwo={
                  <>
                    <video
                      width={"100%"}
                      id="video_two"
                      preload="auto"
                      playsInline
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

            {!showModal && (
              <div className="control_panel">
                <div class="progress" onClick={progressHandler}>
                  <div
                    class="progress__filled"
                    style={{ flexBasis: `${videoProgress}%` }}
                  ></div>
                </div>
                <div className="play_icon">
                  {playing ? (
                    <BiPause onClick={playHanlder} style={{ color: "white" }} />
                  ) : (
                    <BiPlay onClick={playHanlder} style={{ color: "white" }} />
                  )}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BiVolumeLow style={{ color: "white" }} />
                    <input
                      type="range"
                      class="slider"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
