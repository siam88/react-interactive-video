import React from "react";
import styles from "./index.module.css";
const Modal3 = () => {
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
          <div className={styles.question}>
            মেরিন ড্রাইভের দূরত্ব মেরিন ড্রাইভের দূরত্ব মেরিন ড্রাইভের দূরত্ব
            কত?
          </div>
          <div className={styles.answers}>
            <div className={`${styles.answer} ${styles.active}`}>70km</div>
            <div className={styles.answer}>20km</div>
            <div className={styles.answer}>90km</div>
            <div className={styles.answer}>80km</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal3;
