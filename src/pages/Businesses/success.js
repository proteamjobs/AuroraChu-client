import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Layout,
  Menu,
  Avatar,
  Button,
  Icon,
  Breadcrumb,
  Modal,
  Upload,
  Input,
  Radio,
  Rate,
  Spin
} from "antd";
import "./businesses.css";
import ImgCrop from "antd-img-crop";
import baseURL from "../../baseURL";

const { TextArea } = Input;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Success extends Component {
  state = {
    userInfo: null,
    marketerInfo: null,
    post: null,
    selected_quantity: null,
    value: 1,
    text: "",
    credit: 0
  };

  componentDidMount() {
    console.log(this.props);
    this.setState({
      userInfo: this.props.location.state.user_info,
      marketerInfo: this.props.location.state.marketer_info,
      post: this.props.location.state.post,
      selected_quantity: this.props.location.state.selected_quantity
    });
  }

  render() {
    let { userInfo, marketerInfo, post, selected_quantity } = this.state;

    if (userInfo && marketerInfo && post && selected_quantity) {
      return (
        <div className="successContent">
          <div>
            <img
              src={require("./bridge.png")}
              style={{ width: 500, height: 400 }}
            />
            <p style={{ textAlign: "center", fontSize: 24, fontWeight: 400 }}>
              주문이 성공적으로 완료되었습니다!
            </p>
          </div>

          <div className="orderTable" style={{ width: "60%" }}>
            <div className="orderTableTitle">
              <p style={{ width: "60%", borderRight: "0.5px solid gray" }}>
                상품 명
              </p>
              <p style={{ width: "15%", borderRight: "0.5px solid gray" }}>
                마케터
              </p>
              <p style={{ width: "10%", borderRight: "0.5px solid gray" }}>
                수량
              </p>
              <p style={{ width: "15%" }}>주문 금액</p>
            </div>
            <div className="orderTableRow">
              <p style={{ width: "60%", borderRight: "0.5px solid gray" }}>
                {post.title}
              </p>
              <p style={{ width: "15%", borderRight: "0.5px solid gray" }}>
                {marketerInfo.nickname}
              </p>
              <p style={{ width: "10%", borderRight: "0.5px solid gray" }}>
                {selected_quantity}개
              </p>
              <p style={{ width: "15%" }}>{selected_quantity * 9000}원</p>
            </div>
          </div>

          <Link to="/">
            <Button
              style={{
                width: 174,
                height: 42,
                marginTop: 20,
                backgroundColor: "#C4C4C4"
              }}
            >
              처음 화면으로
            </Button>
          </Link>
        </div>
      );
    } else {
      return <Spin indicator={antIcon} />;
    }
  }
}

export default Success;
