import React from "react";
import PageLayout from "../../layout/PageLayout";
import unsuccess from "../../assets/all-images/Retry.png";
import robiLogo from "../../assets/all-images/robi-logo.svg";
import RegistrationBg from "../../assets/all-images/BTS---Registration-page-bg.jpg";
import unsuccessBtn from "../../assets/all-images/unsuccess_btn.png";

function Failed(props) {
    return (
        <div>
            <PageLayout>
                <div className="intro_bg">
                    <img src={RegistrationBg} alt="page background" loading="lazy" />
                </div>
                <div className="robi_logo">
                    <img src={robiLogo} alt="robi logo" loading="lazy" />
                </div>
                <div className="unsuccess_component">
                    <div className="unsuccess_messages">
                        <img src={unsuccess} alt="" loading="lazy" />
                    </div>
                    <h2 className="title">আপনার প্রশ্নের উত্তর সঠিক হয়নি।</h2>
                    <div className="btn_unsuccess" onClick={() => props.onRestart()}>
                        <img src={unsuccessBtn} alt="" loading="lazy" />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
}

export default Failed;
