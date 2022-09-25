import React, { useContext } from "react";
import styles from "./index.module.css";

const ModalTemp = ({ question, onSelectItem }) => {
  return (
    <div className={styles.quizBox}>
      <div className={styles.content}>
        <img
          src={require(`../../../assets/images/marineDrive.png`)}
          alt="Modal1 background "
        />
        <p>{question?.topic?.question[0]?.remarks}</p>

        <div className={styles.quiz}>
          <div className={styles.question}>
            {" "}
            {question?.topic?.question[0]?.title}?
          </div>
          <div className={styles.answers}>
            {/* <div className={`${styles.answer} ${styles.active}`}>
              ব -দ্বীপের আবাসস্থল{" "}
            </div> */}

            {question?.topic?.question[0]?.options?.map((e, i) => (
              <div
                className={styles.answer}
                key={i}
                onClick={() =>
                  onSelectItem({
                    topicId: question?.topic?.id,
                    questionId: question?.topic?.question[0]?.id,
                    optionId: e?.id,
                    startTime: Math.round(Date.now() / 1000),
                  })
                }
              >
                {e.option}{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTemp;
