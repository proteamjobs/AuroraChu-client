import React from "react";
import SigninForm from "./SigninForm";

function Signin({ history }) {
  return (
    <div>
      <SigninForm history={history} />
      <div>
        <button>아이디/비밀번호 찾기</button>
        <button onClick={() => history.push("/signup")}>
          아직 회원이 아니신가요?
        </button>
      </div>
    </div>
  );
}

export default Signin;
