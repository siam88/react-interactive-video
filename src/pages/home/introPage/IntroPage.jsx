import React, { useEffect, useState } from "react";
import Introbg from "../../../assets/all-images/Intro-Bg.jpg";
import robiLogo from "../../../assets/all-images/robi-logo.svg";
import playIcon from "../../../assets/all-images/play-btn.png";
import ball from "../../../assets/all-images/ball.png";
import ballWithMen from "../../../assets/all-images/ball-with-men.svg";
import khelaPaltabe from "../../../assets/all-images/khela-paltabe-robi.png";
import PageLayout from "../../../layout/PageLayout";
import { MobileCheck } from "../../../utils";

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
