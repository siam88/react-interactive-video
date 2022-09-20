import React from 'react'
import styles from './index.module.css'

const HotSpots = (props) => {
    return (
        <div

            style={{ opacity: props.showInfo === true ? 1 : 0 }}
            onClick={props.openModal}
        >

            {/* <div
                className={styles.img_btn}

            >
                <img src="/image/tamim.png" alt="i am tamim" />
            </div> */}
            {props.hotSpottingItem.HotSpotComponent}
        </div>
    )
}

export default HotSpots