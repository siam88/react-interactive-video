import React from 'react'
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import styles from './index.module.css';
// i

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


            <div className={styles.quizBox} >
                <div className={styles.content}>
                    <img src={require(`../../assets/images/marineDrive.png`)} />
                    <p>
                        কক্সবাজার-টেকনাফ মেরিন ড্রাইভ হল বঙ্গোপসাগর বরাবর কক্সবাজার থেকে টেকনাফ পর্যন্ত
                        80 কিলোমিটার দীর্ঘ রাস্তা এবং এটি বিশ্বের দীর্ঘতম মেরিন ড্রাইভ।
                        এটি 6 মে 2017 তারিখে প্রধানমন্ত্রী শেখ হাসিনা উদ্বোধন করেন
                    </p>

                    <div className={styles.quiz}>
                        <div className={styles.question}>মেরিন ড্রাইভের দূরত্ব মেরিন ড্রাইভের দূরত্ব মেরিন ড্রাইভের দূরত্ব কত?</div>
                        <div className={styles.answers}>
                            <div className={`${styles.answer} ${styles.active}`}>70km</div>
                            <div className={styles.answer}>20km</div>
                            <div className={styles.answer}>90km</div>
                            <div className={styles.answer}>80km</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal