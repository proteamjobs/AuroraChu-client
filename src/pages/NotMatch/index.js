import React, { Component } from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
class NotMatch extends Component {
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="요청 정보가 잘못 되었습니다."
        extra={
          <Link to={"/"}>
            <Button type="primary">돌아가기</Button>
          </Link>
        }
      ></Result>
    );
  }
}

export default NotMatch;
