import React, { useState } from 'react';
// import PageLayout from "../../../layout/PageLayout";
import TCbg from "../../../assets/all-images/BTS---T_C-page-bg.jpg";
import robiLogo from "../../../assets/all-images/robi-logo.svg";
import Modal from 'react-bootstrap/Modal';
import { MobileCheck, Lock, UnLock } from "../../../utils";

import { IoIosCloseCircle } from 'react-icons/io';
const TermsAndConditions = (props) => {





  return (
    <>
      <Modal

        show={props.show}
        onHide={() => props.setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >




        <Modal.Body>
          {/* <IoCloseCircle /> */}
          <div
            style={{ height: "95vh" }}
            className="page_wrapper">
            <div className='closeBtn'>
              <IoIosCloseCircle color="red" onClick={() => props.setShow(false)} />
            </div>

            <div className="intro_bg ">

              <img src={TCbg} alt="page background" loading="lazy" />
            </div>
            {!MobileCheck() && <div className="robi_logo mt-2">

              <img src={robiLogo} alt="robi logo" loading="lazy" />
            </div>}
            <h2 className="t_c_heading mt-2">শর্তাবলী</h2>

            <div className="t_c_content ">
              <ul>
                <li>
                  প্রতিবার ইউজার পেইজ রিফ্রেশ করলে তাকে নাম ও মোবাইল নাম্বার দিয়ে
                  আবার পেইজে প্রবেশ করতে হবে।
                </li>
                <li>
                  ভিডিও ইন্টারফেসে প্লেয়াররা কীভাবে ভিডিও'র সাথে ইন্টার‍্যাক্ট করবেন
                  সেই নির্দেশনা পাবেন এবং কোথায় কুইজ আছে সেই সংকেতও পাবেন।
                </li>
                <li>
                  ওয়েব ইন্টারফেসে কুইজের প্রশ্নগুলো দেখানো হবে আর নিচে ভিডিও'র
                  ইন্টারফেসে শর্তাবলী'র পেইজে থাকবে।
                </li>
                <li>
                  প্লেয়ারদের ক্রমানুসারে প্রত্যেক প্রশ্নের উত্তর দিতে হবে। অন্যথায়
                  তারা পুরস্কার পাবার যোগ্য বলে বিবেচিত হবে না।
                </li>
                <li>
                  ভিডিও শুরু হবার সময় থেকে টাইমার কাউন্ট করা হবে এবং চতুর্থ প্রশ্নের
                  উত্তর দেয়ার পর টাইমার বন্ধ হবে।
                </li>
                <li>
                  নূন্যতম সময়ের মধ্যে চারটি প্রশ্নের সবগুলোর উত্তর দেয়া প্লেয়াররা
                  জয়ী বলে বিবেচিত হবেন।
                </li>
                <li>
                  পুরস্কার জিততে ইউজারদের অবশ্যই রবি নাম্বার দিয়ে রেজিস্ট্রেশন করতে
                  হবে।
                </li>
                <li>
                  প্রতিযোগিতাটি ক্যাম্পেইন চলাকালীন সময়ের সকাল ১০টা থেকে রাত ১০টা
                  পর্যন্ত চলবে। সেই ভিত্তিতে সবার আগে সঠিক উত্তর দেয়া প্রথম একজন ও
                  প্রতিদিন ১২ জন পুরস্কার পাবেন।
                </li>

                <li>
                  এই প্রতিযোগিতার যাবতীয় স্বত্ব এবং শর্ত রবি আজিয়াটা লিমিটেড দ্বারা
                  সংরক্ষিত।
                </li>
                <li>প্রতিযোগিতাটি একটি সীমিত সময়ের জন্য চলবে।</li>
              </ul>
            </div>

          </div>
        </Modal.Body>


      </Modal>
    </>
  );
};

export default React.memo(TermsAndConditions);

