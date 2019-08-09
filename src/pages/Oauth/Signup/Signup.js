import React from "react";
import SignupForm from "./SignupForm";

function Signup({ history }) {
  return (
    <div>
      <h2>회원가입</h2>
      <SignupForm history={history} />
    </div>
  );
}

export default Signup;
