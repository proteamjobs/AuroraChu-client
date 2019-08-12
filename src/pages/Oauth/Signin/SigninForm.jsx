import React, { Component } from "react";
import axios from "axios";

import Store from "../../../mobx/signinStore";
import { observer } from "mobx-react";
import { toJS } from "mobx";

@observer
class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  onClickLogin = () => {
    console.log(this.state);
    let body = {
      email: this.state.email,
      password: this.state.password
    };
    if (this.state.email && this.state.password) {
      fetch("http://13.209.78.148:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(json => {
          console.log(json.data.jwt);
          if (json.success) {
            fetch("http://13.209.78.148:8080/auth/me", {
              headers: {
                Authorization: `JWT ${json.data.jwt}`
              }
            })
              .then(res => res.json())
              .then(json => {
                Store.login(json.user);
                console.log("스토어 유저 ::: ", toJS(Store.user));
              });
          }
        });
    } else {
      alert("이메일 또는 비밀번호를 확인해주세요.");
    }
  };
  render() {
    return (
      <div>
        <div>로그인</div>
        <div>
          <input
            type="email"
            placeholder="이메일"
            onChange={text => {
              this.setState({
                email: text.target.value
              });
            }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={text => {
              this.setState({
                password: text.target.value
              });
            }}
          />
          <button
            onClick={() => {
              this.onClickLogin();
            }}
          >
            로그인 하기
          </button>
        </div>
      </div>
    );
  }
}
// function LoginForm({ history }) {
//   const [email, setEmail] = useState(null);
//   const [password, setPassword] = useState(null);

//   const onChangeEmail = e => {
//     setEmail(e.target.value);
//   };

//   const onChangePassword = e => {
//     setPassword(e.target.value);
//   };

//   const onClickLogin = () => {
//     if (email && password) {
//       axios
//         .post("http://13.209.78.148:8080/auth/login", {
//           email: email,
//           password: password
//         })
//         .then(res => {
//           if (res.data.success) {
//             localStorage.setItem("jwt", res.data.data.jwt);
//             history.push("/");
//           } else {
//             alert(res.data.message);
//           }
//         });
//     } else {
//       alert("이메일 또는 비밀번호를 확인해주세요.");
//     }
//   };

//   return (
//     <div>
//       <div>로그인</div>
//       <div>
//         <input type="email" placeholder="이메일" onChange={onChangeEmail} />
//         <input
//           type="password"
//           placeholder="비밀번호"
//           onChange={onChangePassword}
//         />
//         <button onClick={onClickLogin}>로그인 하기</button>
//       </div>
//     </div>
//   );
// }

export default LoginForm;
