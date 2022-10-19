import React from "react";
import PageLayout from "../layout/PageLayout";
import RegistrationBg from "../assets/all-images/BTS - Registration page bg.png";
import btnReg from "../assets/all-images/btn-registration.png";
import robiLogo from "../assets/all-images/robi-logo.svg";

function RegistrationComp(props) {
  return (
    <>
      <PageLayout>
        <div className="intro_bg">
          <img src={RegistrationBg} alt="page background" />
        </div>
        <div className="robi_logo">
          <img src={robiLogo} alt="robi logo" />
        </div>
        <div className="registration_component">
          <h4 className="title">কনটেস্টে অংশগ্রহণ করতে</h4>
          <input
            type="text"
            className="input_field"
            placeholder="আপনার নাম সাবমিট করুন"
          />
          <input
            type="text"
            className="input_field"
            placeholder="মোবাইল নাম্বার লিখুন"
          />
          <div className="btn_reg ">
            <img src={btnReg} alt="" />
          </div>
          <div className="term_wrapper d-flex align-items-center">
            <input
              type="checkbox"
              name="terms"
              className="me-2 checkbox_check"
            />
            <label htmlFor="terms" className="terms_condition">
              আমি <a href="#">শর্তাবলীর</a> সাথে একমত
            </label>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export default RegistrationComp;
