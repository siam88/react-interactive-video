import React from "react";
import styles from "./index.module.scss";

import hotspotBtnImg from "../../../assets/all-images/hotspot-img-bandorbon.png";
import hotspotOuterText from "../../../assets/all-images/hotspot-button-text.png";

const HotSpots2 = (props) => {
    return (
        <>
            <div className={styles.img_btn_wrapper}>
                <div className={styles.image_border}></div>
                <img
                    className={styles.hover_text}
                    src={hotspotOuterText}
                    alt="i am tamim"
                />
                <img src={hotspotBtnImg} alt="i am tamim" loading="lazy" />
            </div>
        </>
    );
};

export default HotSpots2;
