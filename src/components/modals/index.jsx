import React, { useContext } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import styles from './index.module.css';
import ModalTemp from './modalTemp';
import { QuizContext } from "../../contexts/quizContext";
import Cookies from "js-cookie";
import md5 from 'md5'
import axios from 'axios';
import { toast } from "react-toastify";

const Modal = (props) => {
    const { questions, setQuizAns, quizAns } = useContext(QuizContext);

    const ResumeVideo = async () => {
        if (props.interactiveItem.id === 6) {


            // const jsonString = JSON.stringify(Object.assign({}, quizAns.questions))

            let result = {
                refId: quizAns.refId,
                answers: quizAns.questions,
                token: Cookies.get(process.env.REACT_APP_POST_SECRET_TOKEN),
                secret: md5(JSON.stringify(Object.assign({}, quizAns.questions)) + quizAns.refId + process.env.REACT_APP_TOP_SECRET_KEY)
            }
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get(process.env.REACT_APP_GET_SECRET_TOKEN)}`,
            };
            await axios.post(`${process.env.REACT_APP_SECRET_URL}/quiz/submit`, result, { headers: headers }
            ).then((res) => {
                console.log({ res })

            }).catch((err) => {
                console.log({ err })
                toast.error(
                    "Something went wrong"
                )
            })
        }
        props.onCloseHandler()
    }

    const onSelectItem = (questions) => {
        let tempQs = [...quizAns.questions]
        tempQs[props.interactiveItem.id] = questions
        setQuizAns({ ...quizAns, questions: tempQs });

    }
    return (

        <div
            className={styles.modal_one}
            style={{
                backgroundImage: `url(${props.interactiveItem.modalBackground})`,
                zIndex: props.showModal ? 10000 : 0,
                opacity: props.showModal ? 1 : 0,
            }}
        >
            <div className={styles.close_btn}>
                <button onClick={() => ResumeVideo()}>
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

            <Details interactiveItem={props.interactiveItem} questions={questions} onSelectItem={onSelectItem} />
        </div>

    )
}

export default Modal

const Details = ({ interactiveItem, questions, onSelectItem }) => {
    switch (interactiveItem.id) {
        case 0:
            return <ModalTemp question={questions[0]} onSelectItem={onSelectItem} />;
        case 1:
            return <ModalTemp question={questions[1]} onSelectItem={onSelectItem} />;
        case 2:
            return <ModalTemp question={questions[2]} onSelectItem={onSelectItem} />;
        case 3:
            return <ModalTemp question={questions[3]} onSelectItem={onSelectItem} />;
        case 4:
            return <ModalTemp question={questions[4]} onSelectItem={onSelectItem} />;
        case 5:
            return <ModalTemp question={questions[5]} onSelectItem={onSelectItem} />;
        case 6:
            return <ModalTemp question={questions[6]} onSelectItem={onSelectItem} />;
        default:
            return;
    }
}

