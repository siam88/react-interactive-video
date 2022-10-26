import React from "react";

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
