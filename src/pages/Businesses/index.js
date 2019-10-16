import React, { Component } from "react";
import { Redirect } from "react-router";

import { Button, Icon, Input, Radio, Spin } from "antd";
import "./businesses.css";
import baseURL from "../../baseURL";

const { TextArea } = Input;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Businesses extends Component {
  state = {
    userInfo: null,
    marketerInfo: null,
    post: null,
    selected_quantity: null,
    value: 1,
    text: "",
    credit: 0,
    upload: false,
    loading: false
  };

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  handle_upload = async () => {
    const token = await sessionStorage.getItem("token");
    let { post, text, selected_quantity, credit, value } = this.state;

    let body = {
      postId: post.post_id,
      purchaseCount: selected_quantity,
      useCredit: Number(credit),
      trade: value,
      requirement: text
    };

    // console.log(body);

    if (token) {
      fetch(baseURL + "/businesses", {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          if (json.success) {
            this.setState({
              upload: true
            });
          }
        });
    }
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
    let {
      userInfo,
      marketerInfo,
      post,
      selected_quantity,
      upload,
      loading
    } = this.state;

    if (upload) {
      return (
        <Redirect
          to={{
            pathname: "/businesses/success",
            state: {
              marketer_info: this.state.marketerInfo,
              post: this.state.post,
              user_info: this.state.userInfo,
              selected_quantity: this.state.selected_quantity
            }
          }}
        />
      );
    }

    if (userInfo && marketerInfo && post && selected_quantity) {
      return (
        <div className="bussinessesContent">
          <p className="bussinessesTitle">구매하기</p>

          <div className="orderForm">
            <p className="orderTitle">주문 정보</p>
            <div className="orderTable">
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
                <p
                  style={{
                    width: "60%",
                    borderRight: "0.5px solid gray",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    wordWrap: "normal"
                  }}
                >
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
          </div>

          <div className="orderForm">
            <p className="orderTitle">요청 정보</p>
            <TextArea
              placeholder="특별히 요청할 내용이 있다면 적어주세요. ex) 간결하게 요약해주세요!"
              style={{ margin: 20, width: "50%", height: 70 }}
              onChange={e => {
                this.setState({
                  text: e.target.value
                });
              }}
              value={this.state.text}
            />
          </div>

          <div className="orderForm">
            <p className="orderTitle">추가 결제 수단</p>
            <div className="creditForm">
              <p style={{ width: "30%" }}>크래딧 사용</p>
              <Input
                placeholder="0"
                style={{ width: "40%", height: 25, marginRight: 10 }}
                onChange={e => {
                  this.setState({
                    credit: e.target.value
                  });
                }}
                value={this.state.credit}
              />
              <p style={{ width: "30%" }}>원</p>
            </div>
          </div>

          <div className="orderForm">
            <p className="orderTitle">결제 수단</p>
            <Radio.Group
              onChange={this.onChange}
              value={this.state.value}
              style={{ margin: 20 }}
            >
              <Radio value={1}>신용카드</Radio>
              <Radio value={0}>무통장 입금</Radio>
            </Radio.Group>
          </div>

          <div className="bottomForm">
            <div style={{ textAlign: "right" }}>
              <p>총 상품금액</p>
              <p>추가 결제 수단</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p>{selected_quantity * 9000}원</p>
              <p>-{this.state.credit}원</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 14 }}>결제 금액</p>
              <p style={{ fontSize: 24 }}>
                {selected_quantity * 9000 - this.state.credit}원
              </p>
            </div>
            <Button
              style={{ backgroundColor: "gray", fontWeight: "bold" }}
              onClick={() => {
                this.setState({
                  loading: true
                });
                this.handle_upload();
              }}
              loading={loading}
            >
              결제하기
            </Button>
          </div>
        </div>
      );
    } else {
      return <Spin indicator={antIcon} />;
    }
  }
}

export default Businesses;
