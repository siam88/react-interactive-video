import React, { useContext } from "react";
import styles from './index.module.css';
import CustomModal from './modal';
import { QuizContext } from "../../contexts/quizContext";
import Cookies from "js-cookie";
import md5 from 'md5'
import { ResponseMsgFormatter } from '../../utils';
import axios from 'axios';
import { toast } from "react-toastify";
import OverlayLayout from "../../layout/overlayLayout/OverlayLayout";
import btnBack from '../../assets/all-images/btn_back.png'
import PageTopImg from '../../assets/all-images/inner-img-Bandarban.png'
import QuestionModal from "../questionModal/QuestionModal";

const Modal = (props) => {
    const { questions, setQuizAns, quizAns } = useContext(QuizContext);



    const onSubmitResult = async () => {

        if (props.interactiveItem.id === 3) {

            let qsAndAnsSet = quizAns.questions.map((e, i) => {
                if (!e.topicId) {

                    return { topicId: questions[i].topic.id, questionId: questions[i].topic.question[0].id, optionId: 0, startTime: 0 }

                } else {
                    return e
                }
            })



            // const jsonString = JSON.stringify(Object.assign({}, quizAns.questions))
            // console.log("Type one===>", JSON.stringify(Object.assign({}, quizAns.questions)))
            // console.log("Type two===>", JSON.stringify(quizAns.questions) + quizAns.refId + process.env.REACT_APP_TOP_SECRET_KEY)
            let result = {
                refId: quizAns.refId,
                answers: qsAndAnsSet,
                token: Cookies.get(process.env.REACT_APP_POST_SECRET_TOKEN),
                secret: md5(JSON.stringify(qsAndAnsSet) + quizAns.refId + process.env.REACT_APP_TOP_SECRET_KEY)
            }
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get(process.env.REACT_APP_GET_SECRET_TOKEN)}`,
            };
            await axios.post(`${process.env.REACT_APP_SECRET_URL}/quiz/submit`, result, { headers: headers }
            ).then((res) => {
                toast.success(res.data.data.rightAnswerCount)

                if (res.data.statusCode === "400200") {
                    console.log("api call", res.data)
                    props.setResult(res.data.data.status)

                }
            }).catch((err) => {
                toast.error(
                    err.response.data.message
                        ? ResponseMsgFormatter(err.response.data.message)
                        : "Something went wrong"
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
       
        // <OverlayLayout>
        //     <div className="modal_component">
        //         <div className="btn_back">
        //             <img src={btnBack} alt="" />
        //         </div>
        //         <div className="inner_content_wrapper">
        //             <div className="page_top_img">
        //                 <img src={PageTopImg} alt="" />
        //             </div>
        //             <h2 className="heading">বান্দরবান</h2>
        //             <p className="question">
        //                 বান্দরবানের বগা লেক স্থানীয়ভাবে কী নামে পরিচিত?
        //             </p>

        //             <div className="answer_wrapper">
        //                 <button type="button" className="ans">
        //                     রাজা শ্রীভবদেব
        //                 </button>
        //                 <button type="button" className="ans">
        //                     রাজা রামমোহন
        //                 </button>
        //                 <button type="button" className="ans">
        //                     রাজা লক্ষণ সেন
        //                 </button>
        //                 <button type="button" className="ans">
        //                     রাজা শ্রীবল্লভ
        //                 </button>
        //             </div>
        //             {/* ========== Submit Button ==========  */}
        //             <div className="flex_center ">
        //                 <button type="button" className="submit">
        //                     Submit Answer
        //                 </button>
        //             </div>
        //             {/* =========== Facebook ======= */}
        //             <div className="facebook_link">
        //                 {" "}
        //                 <svg
        //                     stroke="currentColor"
        //                     fill="currentColor"
        //                     stroke-width="0"
        //                     viewBox="0 0 320 512"
        //                     xmlns="http://www.w3.org/2000/svg"
        //                 >
        //                     {" "}
        //                     <path
        //                         fill="white"
        //                         d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
        //                     ></path>
        //                 </svg>
        //             </div>
        //         </div>
        //     </div>
        // </OverlayLayout>
        <div
            className={styles.modal_one}
            style={{
                backgroundImage: `url(${props.interactiveItem.modalBackground})`,
                zIndex: props.showModal ? 10000 : 0,
                opacity: props.showModal ? 1 : 0,
            }}
        >




            <Details interactiveItem={props.interactiveItem} questions={questions} onSelectItem={onSelectItem} onSubmitResult={onSubmitResult} />
        </div>

    )
}

export default React.memo(Modal)

const Details = ({ interactiveItem, questions, onSelectItem, onSubmitResult }) => {
    switch (interactiveItem.id) {
        case 0:
            return <CustomModal question={questions[0]} onSelectItem={onSelectItem} onSubmitResult={onSubmitResult} />;
        case 1:
            return <CustomModal question={questions[1]} onSelectItem={onSelectItem} onSubmitResult={onSubmitResult} />;
        case 2:
            return <CustomModal question={questions[2]} onSelectItem={onSelectItem} onSubmitResult={onSubmitResult} />;
        case 3:
            return <CustomModal question={questions[3]} onSelectItem={onSelectItem} onSubmitResult={onSubmitResult} />;

        default:
            return;
    }
}

