import React from "react";
import PageLayout from "../../layout/PageLayout";
import ModalBg from "../../assets/all-images/overlay-bg-Cox_s Bazar.png";
import PageTopImg from "../../assets/all-images/inner-img-Bandarban.png";
import btnBack from "../../assets/all-images/btn_back.png";
import OverlayLayout from "../../layout/overlayLayout/OverlayLayout";

function QuestionModal(props) {
  return (
    <OverlayLayout>
      <div className="modal_component">
        <div className="btn_back">
          <img src={btnBack} alt="" />
        </div>
        <div className="inner_content_wrapper">
          <div className="page_top_img">
            <img src={PageTopImg} alt="" />
          </div>
          <h2 className="heading">বান্দরবান</h2>
          <p className="question">
            বান্দরবানের বগা লেক স্থানীয়ভাবে কী নামে পরিচিত?
          </p>

          <div className="answer_wrapper">
            <button type="button" className="ans">
              রাজা শ্রীভবদেব
            </button>
            <button type="button" className="ans">
              রাজা রামমোহন
            </button>
            <button type="button" className="ans">
              রাজা লক্ষণ সেন
            </button>
            <button type="button" className="ans">
              রাজা শ্রীবল্লভ
            </button>
          </div>
          {/* ========== Submit Button ==========  */}
          <div className="flex_center ">
            <button type="button" className="submit">
              Submit Answer
            </button>
          </div>
          {/* =========== Facebook ======= */}
          <div className="facebook_link">
            {" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 320 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                fill="white"
                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </OverlayLayout>
  );
}

export default QuestionModal;
