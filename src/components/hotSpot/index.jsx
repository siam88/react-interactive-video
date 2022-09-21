import React from 'react'
import styles from './index.module.css'

const HotSpots = (props) => {
    return (
        <div

            style={{ opacity: props.showInfo === true ? 1 : 0 }}
            onClick={props.openModal}
        >


            {props.interactiveItem.hotSpotComponent}
        </div>
    )
}

export default HotSpots