import React from 'react'
import styles from './index.module.css'
import hotspot1 from '../../../assets/images/hotspot1.png'

const HotSpots1 = (props) => {
    return (
        <div
            className={styles.img_btn}

        >
            <img src={hotspot1} alt="i am tamim" />
        </div>
    )
}

export default HotSpots1