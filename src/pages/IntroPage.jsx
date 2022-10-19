import React, { useEffect, useState } from "react";
import Introbg from "../assets/all-images/Intro-Bg.png";
import robiLogo from "../assets/all-images/robi-logo.svg";
import playIcon from "../assets/all-images/play-btn.png";
import ball from "../assets/all-images/ball.png";
import ballWithMen from "../assets/all-images/ball-with-men.svg";
import khelaPaltabe from "../assets/all-images/khela-paltabe-robi.png";
import PageLayout from "../layout/PageLayout";
import { MobileCheck, Lock, UnLock } from "../utils";

const IntroPage = (props) => {
  const [instruction1, setInstruction1] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setInstruction1((state) => !state);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const onStart = () => {
    if (MobileCheck()) {
      // Lock()
    }
    props.setIntro(false);
  };
  return (
    <>
      <PageLayout visible={props.appState.hideInstructions}>
        <div className="intro_bg">
          <img src={Introbg} alt="page background" />
        </div>
        <div className="robi_logo">
          <img src={robiLogo} alt="robi logo" />
        </div>
        <div className="initial_Play_btn" style={{ opacity: 1 }} onClick={() => onStart()}>
          <img src={playIcon} alt="i am tamim" />
        </div>
        <div className="khelaPaltabe">
          <img src={khelaPaltabe} alt="" />
        </div>
        {instruction1 ? (
          <>
            {/* ======== Bottom 1st content ======== */}
            <div className="bottom_content d-flex align-items-center ">
              <div className="ball_icon">
                <img src={ball} alt="" />
              </div>
              <div className="text_content">
                <p className="mb-2">হটস্পটে ক্লিক করে</p>
                <h3 className="heading">জিতে নিন তামিমের সিগনেচারসহ ব্যাট</h3>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ======== Bottom 2st content ======== */}
            <div className="bottom_content d-flex align-items-center ">
              <div className="ball_with_men">
                <img src={ballWithMen} alt="" />
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
