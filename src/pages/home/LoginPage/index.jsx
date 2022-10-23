import React, { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import PageLayout from "../../../layout/PageLayout";
import RegistrationBg from "../../../assets/all-images/BTS---Registration-page-bg.jpg";
import btnReg from "../../../assets/all-images/btn-registration.png";
import robiLogo from "../../../assets/all-images/robi-logo.svg";
import { QuizContext } from "../../../contexts/quizContext";
import { useNavigate } from "react-router-dom";
import { ResponseMsgFormatter, Lock, MobileCheck, CheckIOS } from "../../../utils";
import TermsAndCondition from '../T&CPage'


const IntroPage = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [show, setShow] = useState(false);

  let navigate = useNavigate();
  const { setQuestions, setQuizAns, quizAns } = useContext(QuizContext);



  const onChangeName = (e) => {
    let name = e.target.value;
    setName(name);

    if (name.length > 1) {
      setNameError("");
    } else {
      setNameError("At least 2 word required");
    }
  };
  const onChangeNumber = (e) => {
    let phone = e.target.value;
    setPhone(phone);

    if (phone.length === 11) {
      setPhoneError("");
    } else {
      setPhoneError("Please Input your 11 digit Robi Number");
    }
  };
  const onHandleTC = () => {
    // navigate(`/terms-and-conditions`);
    setShow(true)
  }
  const onHandleLogin = async () => {
    // e.preventDefault()
    props.setLoading(true);

    let postData = {
      name: name,
      phone: phone,
    };

    await axios
      .post(`${process.env.REACT_APP_SECRET_URL}/login`, postData)
      .then((res) => {
        if (res.data.statusCode === "400200") {
          Cookies.set(
            process.env.REACT_APP_GET_SECRET_TOKEN,
            res.data.data.token,
            {
              expires: res.data.data.expires_in / 86400,
            }
          );

          props.setAuth(true);
          props.setLoading(false);
          // toast.success(res.data.message)
          // onPlayVideo()
          onPlayVideo();
        } else {
          toast.error("Something went wrong");
          props.setAuth(false);
          props.setLoading(false);
        }
      })
      .catch((err) => {
        props.setLoading(false);
        toast.error(
          err.response.data.message
            ? ResponseMsgFormatter(err.response.data.message)
            : "Something went wrong"
        );
      });
  };
  const onPlayVideo = async () => {
    props.setLoading(true);
    const token = Cookies.get(process.env.REACT_APP_GET_SECRET_TOKEN);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    await axios
      .get(`${process.env.REACT_APP_SECRET_URL}/request/quiz`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.statusCode === "400200") {
          setQuestions(res.data.data.questions);
          setQuizAns({ ...quizAns, refId: res.data.data.refId });

          if (MobileCheck()) {
            if (CheckIOS()) {

            } else {
              Lock()
            }
          }
          props.setLoading(false);

          // toast.success("Video is playing")
          Cookies.set(
            process.env.REACT_APP_POST_SECRET_TOKEN,
            res.data.data.token,
            {
              expires: 864000,
            }
          );
          props.initialPlayer();

        } else {
          toast.error("Something went wrong");
          props.setLoading(false);
        }
      })
      .catch((err) => {
        props.setLoading(false);
        toast.error(
          err.response.data.message
            ? ResponseMsgFormatter(err.response.data.message)
            : "Something went wrong"
        );
      });
  };
  return (
    <>
      <PageLayout>
        <div className="intro_bg">
          <img src={RegistrationBg} alt="page background" loading="lazy" />
        </div>
        <div className="robi_logo">
          <img src={robiLogo} alt="robi logo" loading="lazy" />
        </div>
        <div className="registration_component">
          <h4 className="title">কনটেস্টে অংশগ্রহণ করতে</h4>
          <input
            style={{ border: nameError.length > 0 && "1px solid red" }}
            type="text"
            className="input_field "
            placeholder="আপনার নাম সাবমিট করুন"
            value={name}
            onChange={(e) => onChangeName(e)}
          />
          <input
            style={{ border: phoneError.length > 0 && "1px solid red" }}
            type="text"
            className="input_field"
            placeholder="মোবাইল নাম্বার লিখুন"
            onChange={(e) => onChangeNumber(e)}
            value={phone}
          />
          {!(name.length > 1 && phone.length === 11 && nameError.length === 0 && phoneError.length === 0 && checked) ? <div className="btn_reg disabled " >
            <img src={btnReg} alt="" loading="lazy" />
          </div>
            : <div className="btn_reg  " >
              <img src={btnReg} alt="" onClick={() => onHandleLogin()} loading="lazy" />
            </div>}
          <div className="term_wrapper d-flex align-items-center">
            <input
              type="checkbox"
              name="terms"
              className="me-2 checkbox_check"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <label htmlFor="terms" className="terms_condition">
              আমি <span style={{ color: "#c70a18", cursor: "pointer" }} onClick={() => onHandleTC()}>শর্তাবলীর</span> সাথে একমত
            </label>
          </div>
        </div>
      </PageLayout>
      <TermsAndCondition show={show} setShow={setShow} />
    </>
  );
};

export default IntroPage;
