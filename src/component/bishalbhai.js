import React, { useState, useEffect } from "react";
import { CloseIconComparePacks } from "../vectors";
import AppModal from "./AppModal";
import { postRequest } from "../API";
import { getCookie } from "../../utils/cookie";
import variables from "../variables";
import { Snackbar } from "../components";
import { translate, translateText } from "../helpers";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

const CustomCheckbox = withStyles({
  root: {
    "&$checked": {
      color: "#F26522",
    },
  },

  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const SurveryModal = ({ open, handleSurveyClose, locale, surveyData }) => {
  const [surveyAns, setSurveyAns] = useState({});
  const [steps, setSteps] = useState(0);
  const [checkBoxData, setCheckBoxData] = useState([]);
  const [snack, setSnack] = useState({
    snackBarOpen: false,
    snackBarContent: "",
  });
  const [tempValues, setTempValues] = useState({
    showButton: false,
    ansArr: [],
  });

  useEffect(() => {
    displayButton();
  }, [checkBoxData]);

  const handleInputChange = (ans, ques, type, item) => {
    setSurveyAns({ ...surveyAns, [ques]: { answer: ans, input: type } });

    if (type === "radio") {
      setTempValues({ ...tempValues, showButton: true });
    } else if (type === "text" && ans.length > 0) {
      setTempValues({ ...tempValues, showButton: true });
    } else if (type === "text" && ans.length === 0) {
      setTempValues({ ...tempValues, showButton: false });
    }
  };

  const handleCheck = (ans, ques, item) => {
    let temp = [...checkBoxData];

    if (temp.includes(ans)) {
      temp = temp.filter((d) => d !== ans);
    } else {
      temp.push(ans);
    }
    setCheckBoxData(temp);
    setTempValues({ ...tempValues, ansArr: item });
  };

  const handleStepChange = () => {
    setSteps((prev) => prev + 1);
    setTempValues({ ...tempValues, showButton: false });
  };

  const handleSubmit = async () => {
    let data = [];
    const token = getCookie(variables.apiTokenKey);

    if (Object.keys(surveyAns).length > 0) {
      for (let ans in surveyAns) {
        if (surveyAns[ans].input === "radio") {
          data.push({
            questionId: ans,
            input_type: "radio",
            answers: [surveyAns[ans].answer],
          });
        } else {
          data.push({
            questionId: ans,
            input_type: "text",
            answers: [surveyAns[ans].answer],
          });
        }
      }
    }
    surveyData.map((survey, id) => {
      let temp = [];
      survey.answer.map((x) => {
        if (checkBoxData.includes(x.id)) {
          temp.push(x.id);
        }
      });
      if (temp.length > 0) {
        data.push({
          questionId: survey.id,
          input_type: "checkbox",
          answers: temp,
        });
      }
    });
    const result = await postRequest(
      variables.apiUrls.postSurveyData,
      data,
      token
    );
    if (result.statusCode === 400200) {
      let obj = { variant: "success", message: "Thank you for your time." };
      setSnack({
        snackBarOpen: true,
        snackBarContent: obj,
      });
      handleSurveyClose();
    } else {
      let obj = { variant: "error", message: result.errors };
      setSnack({
        snackBarOpen: true,
        snackBarContent: obj,
      });
      handleSurveyClose();
    }
  };

  const displayButton = () => {
    let tempArr = tempValues.ansArr.map((d) => d.id);
    if (checkBoxData.length > 0) {
      checkBoxData.find((val, index) => {
        if (tempArr.includes(val)) {
          setTempValues({ ...tempValues, showButton: true });
        } else if (!tempArr.includes(val)) {
          setTempValues({ ...tempValues, showButton: false });
        }
      });
    } else {
      setTempValues({ ...tempValues, showButton: false });
    }
  };

  // console.log(surveyData);

  return (
    <div>
      <AppModal
        modalbg="white"
        modalWidth="840px"
        bodyPadding="0px"
        open={open}
        onClose={handleSurveyClose}
        closeIcon={false}
      >
        <div className="survey_modal_body">
          <div className="survey_header pointer" onClick={handleSurveyClose}>
            <CloseIconComparePacks />
          </div>
          <div className="survey_body">
            {surveyData &&
              surveyData.map((d, index) => {
                if (index === steps) {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className="survey_image"
                        style={{
                          backgroundImage: `url(${encodeURI(d.cover)})`,
                        }}
                      ></div>
                      <div className="survey_content">
                        <img src="/images/footer_logo.svg" alt="app_logo" />
                        <div className="survey_title">
                          <h2>{translate(locale, "survey.dontMiss")}!</h2>
                          <p>
                            <span>{steps + 1}</span> out of {surveyData.length}
                          </p>
                        </div>
                        <div className="survey_questions">
                          <p className="question_title">
                            {translateText(locale, d)}
                          </p>
                          {d.input_type === "radio" ? (
                            <div className="answer_list">
                              {d.answer.map((a, i) => {
                                // console.log("a", a);
                                return (
                                  <div
                                    className="custom-control custom-radio custom-control-inline survey_input pointer"
                                    key={i}
                                  >
                                    <input
                                      type="radio"
                                      id={
                                        a.id === 1
                                          ? "x"
                                          : a.id === 2
                                          ? "y"
                                          : a.id
                                      }
                                      // id={a.id}
                                      value={a.title_en}
                                      name={d.title_en}
                                      onChange={(e) =>
                                        handleInputChange(
                                          a.id,
                                          d.id,
                                          "radio",
                                          d
                                        )
                                      }
                                      className="custom-control-input survey-control-input"
                                      // a.id === 1 ? "x" : a.id === 2 ? "y" : a.id
                                    />
                                    <label
                                      className="custom-control-label survey-control-label pointer"
                                      htmlFor={
                                        a.id === 1
                                          ? "x"
                                          : a.id === 2
                                          ? "y"
                                          : a.id
                                      }
                                    >
                                      {translateText(locale, a)}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          ) : d.input_type === "text" ? (
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                id={d.id}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    d.id,
                                    "text"
                                  )
                                }
                              />
                            </div>
                          ) : (
                            <div className="d-flex survey_checkbox_wrapper">
                              {d.answer.map((a, j) => {
                                return (
                                  <div className="survey_checkbox" key={j}>
                                    <FormControlLabel
                                      control={
                                        <CustomCheckbox
                                          onChange={() =>
                                            handleCheck(a.id, d.id, d.answer)
                                          }
                                        />
                                      }
                                      label={translateText(locale, a)}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div className="survey_footer">
                          {surveyData.length === steps + 1 ? (
                            <button
                              className="btn_primary survey_next_btn"
                              onClick={handleSubmit}
                              disabled={!tempValues.showButton}
                            >
                              {translate(locale, "survey.submit")}
                            </button>
                          ) : (
                            <button
                              className="btn_primary survey_next_btn"
                              onClick={handleStepChange}
                              disabled={!tempValues.showButton}
                            >
                              {translate(locale, "survey.next")}
                            </button>
                          )}

                          <p className="pointer" onClick={handleSurveyClose}>
                            {translate(locale, "survey.noThanks")}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                }
              })}
          </div>
        </div>
      </AppModal>
      {snack.snackBarOpen ? (
        <Snackbar
          open={snack.snackBarOpen}
          variant={snack.snackBarContent.variant}
          message={snack.snackBarContent.message}
          onClose={() => setSnack({ ...snack, snackBarOpen: false })}
        />
      ) : null}
    </div>
  );
};

export default SurveryModal;
