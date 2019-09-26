import React from "react";
import SignupForm from "./SignupForm";
import SignupBridge from "./SignupBridge";

function Signup({ history, getUserData, userInfo }) {
  return (
    <>
      {!userInfo ? (
        <SignupForm history={history} getUserData={getUserData} />
      ) : (
        <SignupBridge history={history} />
      )}
    </>
  );
}

export default Signup;
