import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Button } from "antd";

import bridgeImg from "./bridge.png";
import "antd/dist/antd.css";

const SignupBridge = props => {
  return (
    <div className="bridge_container">
      <div>
        <img src={bridgeImg} className="bridge_img" alt="" />
        <div style={{ textAlign: "center" }}>
          <h2>환영합니다!</h2>
          <h4>회원가입이 성공적으로 승인되었습니다.</h4>
        </div>
      </div>
      <div className="bridge_button_div">
        <Link to="/">
          <Button className="bridge_button" type="primary">
            메인 화면
          </Button>
        </Link>
        <Link to="/myclassroom">
          <Button className="bridge_button" type="primary">
            나의 강의실
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(SignupBridge);
