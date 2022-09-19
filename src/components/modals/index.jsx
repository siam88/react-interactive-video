import React from 'react'
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import styles from './index.module.css';

const Modal = (props) => {

    return (
        <div
            className={styles.modal_one}
            style={{
                zIndex: props.showModal ? 10000 : 0,
                opacity: props.showModal ? 1 : 0,
            }}
        >
            <div className={styles.close_btn}>
                <button onClick={props.onCloseHandler}>
                    Back To
                    <br /> Video
                </button>
            </div>

            <div className={styles.social_icons}>
                <ul>
                    <li>
                        <a
                            href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaFacebookF />
                        </a>
                    </li>
                    <li>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaTwitter />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Modal