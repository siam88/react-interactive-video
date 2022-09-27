import React, { useContext } from "react";
import styles from "./index.module.css";
import { QuizContext } from "../../../contexts/quizContext";

const Modal6 = () => {
  const { questions } = useContext(QuizContext);

  return (
    <div className={styles.quizBox}>
      <div className={styles.content}>
        <img
          src={require(`../../../assets/images/marineDrive.png`)}
          alt="Modal1 background "
        />
        <p>{questions[5]?.topic?.question[0]?.remarks}</p>

        <div className={styles.quiz}>
          <div className={styles.question}>
            {" "}
            {questions[5]?.topic?.question[0]?.title}?
          </div>
          <div className={styles.answers}>
            {/* <div className={`${styles.answer} ${styles.active}`}>
              ব -দ্বীপের আবাসস্থল{" "}
            </div> */}

            {questions[5]?.topic?.question[0]?.options?.map((e, i) => (
              <div className={styles.answer}>{e.option} </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal6;
