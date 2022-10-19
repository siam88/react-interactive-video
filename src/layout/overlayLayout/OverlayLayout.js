import React from "react";

function OverlayLayout(props) {
  return (
    <>
      {" "}
      <div
        className="overlay_page_wrapper"
        style={props.visible ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: 0 }}
      >
        <div className="overlay_bg">
          <img src={props.ModalBg} alt="page background" />
        </div>

        {props.children}
      </div>
    </>
  );
}

export default OverlayLayout;
