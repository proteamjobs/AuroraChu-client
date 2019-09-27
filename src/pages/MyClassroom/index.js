import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { message } from "antd";
import Classroom from "./Classroom";

class MyClassroom extends Component {
  render() {
    const { userInfo, getUserData, history } = this.props;
    console.log("history::: ", this.props.history);

    return userInfo !== null ? (
      <Classroom
        userInfo={userInfo}
        getUserData={getUserData}
        jwt={sessionStorage.getItem("token")}
      />
    ) : (
      // userInfo.status >= 2 ? (
      //   <Classroom
      //     userInfo={userInfo}
      //     getUserData={getUserData}
      //     jwt={sessionStorage.getItem("token")}
      //   />
      // ) : (
      //   <Redirect to="/mypage" />
      //   // message.error("마케터 교육신청 후 이용가능합니다.", 1, () =>
      //   //   history.push("/mypage")
      //   // )
      // )
      // message.error("로그인 후 이용가능합니다.", 1, () => history.push("/"))
      <Redirect to="/" />
    );
  }
}

export default MyClassroom;
