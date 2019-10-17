import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Classroom from "./Classroom";

class MyClassroom extends Component {
  render() {
    const { userInfo, getUserData } = this.props;

    return userInfo !== null ? (
      <Classroom
        userInfo={userInfo}
        getUserData={getUserData}
        jwt={sessionStorage.getItem("token")}
      />
    ) : (
      <Redirect to="/" />
    );
  }
}

export default MyClassroom;
