import React, { useState, Suspense } from "react";
import "./assets/scss/style.scss";
import HomeLayout from "./layout";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./components/loader";
import { UserContext } from "./contexts/quizContext";
function App() {
  const [userInfo, setUserInfo] = useState();
  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      <Suspense fallback={<Loader />}>
        <Router>
          <ToastContainer />
          <HomeLayout />
        </Router>
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
