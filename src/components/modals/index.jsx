import React, { useContext } from "react";
import Cookies from "js-cookie";
import md5 from 'md5'
import axios from 'axios';
import { toast } from "react-toastify";

import CustomModal from './modal';
import btnBack from "../../assets/all-images/btn_back.png";
import OverlayLayout from "../../layout/overlayLayout/OverlayLayout";
import { QuizContext } from "../../contexts/quizContext";
import { ResponseMsgFormatter } from '../../utils';

const Modals = (props) => {
    const { questions, setQuizAns, quizAns } = useContext(QuizContext);

    const onSubmitResult = async () => {
        console.log("hello")
        if (props.interactiveItem.id === 3) {

            let qsAndAnsSet = quizAns.questions.map((e, i) => {
                if (!e.topicId) {

                    return { topicId: questions[i].topic.id, questionId: questions[i].topic.question[0].id, optionId: 0, startTime: 0 }

                } else {
                    return e
                }
            })




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
                    console.log("==>", res.data.data.status)
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
        <OverlayLayout visible={props.showModal} ModalBg={props.interactiveItem.modalBackground}>
            <div className="modal_component">
                <div className="btn_back" onClick={() => onSubmitResult()}>
                    <img src={btnBack} alt="" />
                </div>
                <Details interactiveItem={props.interactiveItem} questions={questions} onSelectItem={onSelectItem} onSubmitResult={onSubmitResult} />
            </div>
        </OverlayLayout>
    );
};

export default React.memo(Modals)


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