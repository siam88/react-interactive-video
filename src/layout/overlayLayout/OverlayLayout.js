import React from "react";
import ModalBg from "../../assets/all-images/overlay-bg-Tamim.png";

function OverlayLayout(props) {
  return (
    <>
      {" "}
      <div
        className="overlay_page_wrapper"
        style={false ? { opacity: 0, zIndex: 0 } : { opacity: 1, zIndex: 1 }}
      >
        <div className="overlay_bg">
          <img src={ModalBg} alt="page background" />
        </div>

        {props.children}
      </div>
    </>
  );
}

export default OverlayLayout;
