import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SignupForm from "./SignupForm";

function Signup({ history }) {
  return (
    <>
      <Header />
      <SignupForm history={history} />
      <Footer />
    </>
  );
}

export default Signup;
