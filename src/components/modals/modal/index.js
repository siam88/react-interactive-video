import React from "react";
import "./index.scss";
import back_btn from "../../../assets/all-images/btn_back.png";

const ModalTemp = ({ question, onSelectItem, onSubmitResult }) => {
  return (
    <div>
      <div className="wrapper">
        <div className="inner_content">
          <div className="top_img">
            <img src={question?.topic?.image} alt="Modal Background" />
          </div>

          <h2 className="heading">{question?.topic?.title}</h2>

          <p className="question">{question?.topic?.question[0]?.title}</p>
          <div className="answer_wrapper">
            {question?.topic?.question[0]?.options?.map((e, i) => (
              <button
                type="button active"
                className="ans"
                key={i}
                onClick={() =>
                  onSelectItem({
                    topicId: question?.topic?.id,
                    questionId: question?.topic?.question[0]?.id,
                    optionId: e?.id,
                    startTime: new Date()
                      .toISOString()
                      .slice(0, 19)
                      .replace("T", " "),
                  })
                }
              >
                {e.option}
              </button>
            ))}
          </div>

          <div className="flex_center ">
            <button
              type="button"
              className="submit"
              onClick={() => onSubmitResult()}
            >
              Submit Answer
            </button>
          </div>
        </div>
        <div className="facebook_link">
          {" "}
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 320 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <a
              href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <path
                fill="white"
                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
              ></path>
            </a>
          </svg>
        </div>
      </div>

      <img
        src={back_btn}
        alt="Back"
        className="btn_back"
        onClick={() => onSubmitResult()}
      />
    </div>
  );
};

export default ModalTemp;
