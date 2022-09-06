import React from "react";

const Test = () => {
  const playHandlerTest1 = () => {
    const video1 = document.getElementById("video_one");
    video1.play();
  };
  const playHandlerTest2 = () => {
    const video2 = document.getElementById("video_two");
    video2.play();
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <button onClick={playHandlerTest1}>video 1 on played</button>

        <video
          playsInline
          autoPlay
          muted
          loop
          width={"100%"}
          id="video_one"
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
            src="https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_12.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div style={{ width: "50%" }}>
        <button onClick={playHandlerTest2}>video 2 on played</button>

        <video
          autoPlay
          muted
          loop
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
            src="https://bangabandhuzone.s3.ap-southeast-1.amazonaws.com/tamim_app_32.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default Test;
