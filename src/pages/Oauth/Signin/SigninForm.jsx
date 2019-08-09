import React, { useState } from "react";
import axios from "axios";

function LoginForm({ history }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    if (email && password) {
      axios
        .post("http://13.209.78.148:8080/auth/login", {
          email: email,
          password: password
        })
        .then(res => {
          if (res.data.success) {
            localStorage.setItem("jwt", res.data.data.jwt);
            history.push("/");
          } else {
            alert(res.data.message);
          }
        });
    } else {
      alert("이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div>
      <div>로그인</div>
      <div>
        <input type="email" placeholder="이메일" onChange={onChangeEmail} />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
        />
        <button onClick={onClickLogin}>로그인 하기</button>
      </div>
    </div>
  );
}

export default LoginForm;
