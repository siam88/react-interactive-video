import React from "react";
import styles from "./index.module.css";
const Modal2 = () => {
  return (
    <div className={styles.quizBox}>
      <div className={styles.content}>
        <img
          src={require(`../../../assets/images/marineDrive.png`)}
          alt="Modal1 background "
        />
        <p>
          কক্সবাজার-টেকনাফ মেরিন ড্রাইভ হল বঙ্গোপসাগর বরাবর কক্সবাজার থেকে
          টেকনাফ পর্যন্ত 80 কিলোমিটার দীর্ঘ রাস্তা এবং এটি বিশ্বের দীর্ঘতম মেরিন
          ড্রাইভ। এটি 6 মে 2017 তারিখে প্রধানমন্ত্রী শেখ হাসিনা উদ্বোধন করেন
        </p>

        <div className={styles.quiz}>
          <div className={styles.question}>বাংলাদেশ কি বন্ধুত্বপূর্ণ দেশ?</div>
          <div className={styles.answers}>
            <div className={`${styles.answer} ${styles.active}`}>
              সম্পর্কের{" "}
            </div>
            <div className={styles.answer}>বন্ধুত্বপূর্ণ</div>
            <div className={styles.answer}> আনুষ্ঠানিকভাবে</div>
            <div className={styles.answer}>জাতির সাথে</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
