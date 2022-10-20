import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
// import hotspot1 from "../../../assets/all-images/hot-spots-hover-icon.svg";
import hotspot1 from "../../../assets/all-images/without-hover-btn.svg";

const HotSpots1 = (props) => {
  return (
    <>
      <div className={styles.img_btn}>
        {/* <img src={hotspot1} alt="i am tamim" /> */}
        <div className={styles.inner_img}></div>
      </div>
    </>
  );
};

export default HotSpots1;
