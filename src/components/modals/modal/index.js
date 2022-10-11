import React from "react";
import styles from "./index.module.css";
import { Button } from "react-bootstrap";

const ModalTemp = ({ question, onSelectItem, onSubmitResult }) => {
  return (
    <div className={styles.quizBox}>
      <div className={styles.content}>
        <img src={question?.topic?.image} alt="Modal Background" />

        <div className={styles.quiz}>
          <div className={styles.question}>
            {question?.topic?.question[0]?.title}
          </div>
          <div className={styles.answers}>
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
          <Button className={styles.submitBtn} onClick={() => onSubmitResult()}>
            Submit Answer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalTemp;
