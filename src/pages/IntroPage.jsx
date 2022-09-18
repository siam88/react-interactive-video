import React from 'react'
import playIcon from "../assets/icons/play.png";
import instructionMsgImg from "../assets/images/intro_page.gif";

const IntroPage = (props) => {
    return (

        <div
            className="instruction_wrapper"
            style={
                props.appState.hideInstructions
                    ? { opacity: 0, zIndex: 0 }
                    : { opacity: 1, zIndex: 1 }
            }
        >
            <img
                style={{ width: "100%" }}
                src={instructionMsgImg}
                alt="instruction massage for Interactive video"
            />

            <div className="initial_Play_btn" style={{ opacity: 1 }}>
                <img
                    src={playIcon}
                    alt="i am tamim"
                    onClick={() => props.initialPlayer()}
                />
            </div>
        </div>

    )
}

export default IntroPage