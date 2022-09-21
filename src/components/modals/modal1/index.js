import React from "react";
import styles from "./index.module.css";
const Modal1 = () => {
  return (
    <div className={styles.quizBox}>
      <div className={styles.content}>
        <img
          src={require(`../../../assets/images/marineDrive.png`)}
          alt="Modal1 background "
        />
        <p>
          বাংলাদেশ কিসের জন্য বিখ্যাত? এটি বিশ্বের বৃহত্তম নদী ব -দ্বীপের
          আবাসস্থল , যা ব্রহ্মপুত্র এবং গঙ্গা নদী দ্বারা গঠিত। সুন্দরবনে বেঙ্গল
          টাইগারদের বিচরণ, ব-দ্বীপের একটি ম্যানগ্রোভ এবং জলাভূমি। এশিয়ার
          দীর্ঘতম প্রাকৃতিক নিরবচ্ছিন্ন সমুদ্র সৈকতের জন্য (কক্সবাজার সমুদ্র
          সৈকত), যা 150 কিলোমিটার দীর্ঘ।
        </p>

        <div className={styles.quiz}>
          <div className={styles.question}>বাংলাদেশ কিসের জন্য বিখ্যাত?</div>
          <div className={styles.answers}>
            <div className={`${styles.answer} ${styles.active}`}>
              ব -দ্বীপের আবাসস্থল{" "}
            </div>
            <div className={styles.answer}>ব্রহ্মপুত্র </div>
            <div className={styles.answer}>গঙ্গা নদী</div>
            <div className={styles.answer}>সমুদ্র সৈকতের</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal1;
