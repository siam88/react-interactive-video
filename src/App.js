import React, { Suspense } from "react";
import HomeLayout from "./layout";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./components/loader";
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer />
        <HomeLayout />
      </Router>
    </Suspense>
  );
}

export default App;
