import React from "react";
import robiLogo from "../assets/all-images/robi-logo.svg";
import Introbg from "../assets/all-images/Intro-Bg.png";

function PageLayout(props) {
  return (
    <>
      <div
        className="page_wrapper"
        style={
          props.visible ? { opacity: 0, zIndex: 0 } : { opacity: 1, zIndex: 1 }
        }
      >
        {props.children}
      </div>
    </>
  );
}

export default PageLayout;
