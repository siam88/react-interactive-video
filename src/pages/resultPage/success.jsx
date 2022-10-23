import React from "react";
import PageLayout from "../../layout/PageLayout";
import robiLogo from "../../assets/all-images/robi-logo.svg";
import RegistrationBg from "../../assets/all-images/BTS---Registration-page-bg.jpg";
import Congratulations from "../../assets/all-images/Congratulations.jpg";
import successBtn from "../../assets/all-images/congratulations_btn.jpg";

function Success(props) {
    return (
        <div>
            <PageLayout>
                <div className="intro_bg">
                    <img src={RegistrationBg} alt="page background" loading="lazy" />
                </div>
                <div className="robi_logo">
                    <img src={robiLogo} alt="robi logo" loading="lazy" />
                </div>
                <div className="success_component">
                    <div className="congratulations">
                        <img src={Congratulations} alt="" loading="lazy" />
                    </div>
                    <div className="btn_success my-2 my-md-4">
                        <img src={successBtn} alt="" loading="lazy" />
                    </div>
                    <p className="mb-0">তামিমের অটোগ্রাফসহ ব্যাট জয়ীদের তালিকা জানতে</p>
                    <h2 className="sub_title">চোখ রাখুন রবি ফেসবুক পেইজে।</h2>
                </div>
            </PageLayout>
        </div>
    );
}

export default Success;
