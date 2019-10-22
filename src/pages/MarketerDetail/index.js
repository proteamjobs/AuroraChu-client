import React, { Component } from "react";
import { Tabs, Spin, Avatar, Button, Rate, Select, Divider, Empty } from "antd";
import { withRouter } from "react-router-dom";
import baseURL from "../../baseURL";
import axios from "axios";
import { Link } from "react-router-dom";
const { Option } = Select;

class MarketerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marketer_info: null,
      post: null,
      reviews: [],
      selected_quantity: 1
    };
  }

  componentDidMount() {
    axios
      .get(`${baseURL}/marketers/@${this.props.match.params.nickname}`)
      .then(res => {
        if (res.data.success) {
          this.setState({
            marketer_info: res.data.marketer_info,
            post: res.data.post,
            reviews: res.data.reviews
          });
        }
      });
  }

  renderQuantityOptions = num => {
    let quantities = [];
    for (let i = 1; i < num + 1; i++) {
      quantities.push(i);
    }
    return quantities;
  };

  selectQuantity = num => {
    this.setState({
      selected_quantity: num
    });
  };

  onClickBuy = () => {
    if (!this.props.userInfo) {
      alert("로그인 후 이용 가능한 서비스입니다.");
    }
  };

  onClickChat = () => {
    if (!this.props.userInfo) {
      alert("로그인 후 이용 가능한 서비스입니다.");
    } else {
      this.props.history.push("/chat", {
        targetUserInfo: this.state.marketer_info,
        post: this.state.post
      });
    }
  };

  render() {
    const { TabPane } = Tabs;
    const { marketer_info, post, reviews } = this.state;

    const btnBuy = !this.props.userInfo ? (
      <Button
        style={{ width: 160, height: 36, fontSize: 15 }}
        onClick={this.onClickBuy}
      >
        구매 하기
      </Button>
    ) : (
      <Link
        to={{
          pathname: "/businesses",
          state: {
            marketer_info: this.state.marketer_info,
            post: this.state.post,
            user_info: this.props.userInfo,
            selected_quantity: this.state.selected_quantity
          }
        }}
      >
        <Button style={{ width: 160, height: 36, fontSize: 15 }}>
          구매 하기
        </Button>
      </Link>
    );

    return marketer_info && post ? (
      <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
        <div style={{ display: "flex" }}>
          <div>
            <img
              src={post.image_url}
              style={{ width: 700, height: 450, marginRight: 40 }}
              alt=""
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 380
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 10
              }}
            >
              <Avatar
                src={marketer_info.profile_url}
                size={60}
                style={{ marginRight: 10 }}
              />
              <div>
                <div style={{ fontSize: 16 }}>{marketer_info.nickname}</div>
                <Rate
                  allowHalf
                  disabled
                  value={marketer_info.avg_star}
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 26, fontSize: 16 }}>{post.title}</div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #cdcdcd",
                  padding: 26
                }}
              >
                <div
                  style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}
                >
                  9,000원
                </div>
                <div style={{ marginLeft: 12 }}>
                  <div style={{ fontSize: 15, marginBottom: 5 }}>
                    블로그 원고 작성 500자 이상
                  </div>
                  <div style={{ fontSize: 15, marginBottom: 40 }}>
                    평균 작업 기간 : {post.avg_duration}일
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 15,
                      marginBottom: 30
                    }}
                  >
                    <div style={{ marginRight: 10 }}>수량</div>
                    <div>
                      <Select
                        defaultValue="1"
                        style={{ width: 120 }}
                        onChange={num => this.selectQuantity(num)}
                      >
                        {this.renderQuantityOptions(10).map((num, key) => (
                          <Option key={key} value={num}>
                            {num}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    style={{
                      width: 160,
                      height: 36,
                      marginRight: 10,
                      fontSize: 15
                    }}
                    onClick={this.onClickChat}
                  >
                    문의 하기
                  </Button>

                  {btnBuy}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, marginBottom: 150, width: 700 }}>
          <Tabs animated={false} defaultActiveKey="1">
            <TabPane tab="상세 정보" key="1">
              <br />
              {post.content.split("\n").map((line, idx) => {
                return (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                );
              })}
            </TabPane>
            <TabPane tab="취소 및 환불규정" key="2">
              <br />
              가. 기본 환불 규정
              <br />
              1. 전문가와 의뢰인의 상호 협의하에 청약 철회 및 환불이 가능합니다.
              <br />
              2. 섭외, 대여 등 사전 준비 도중 청약 철회 시, 해당 비용을 공제한
              금액을 환불 가능합니다.
              <br />
              3. 촬영 또는 편집 작업 착수 이후 청약 철회 시, 진행된 작업량 또는
              작업 일수를 산정한 금액을 공제한 금액을 환불 가능합니다.
              <br />
              <br />
              [환불 가이드라인]
              <br />
              (1) 기획 단계에서 청약 철회: 총 결제 금액의 최대 80%까지 환불 가능
              <br />
              (2) 촬영 완료 후 청약 철회: 총 결제 금액의 최대 20%까지 환불 가능
              <br />
              (3) 편집 작업 50% 완료 후 청약 철회: 총 결제 금액의 최대 10%까지
              환불 가능
              <br />
              <br />
              나. 전문가 책임 사유
              <br />
              1. 소비자 피해 보상 규정에 의거하여 촬영 원본의 멸실 및 재해로
              인한 피해 발생 시, 전액 환불합니다.
              <br />
              2. 작업 기간 미준수, 작업 태만 및 이에 상응하는 전문가 책임으로
              인한 청약 철회 시, 환불 및 촬영 원본 제공이 가능합니다.
              <br />
              다. 의뢰인 책임 사유
              <br />
              <br />
              작업이 시작되면 단순 변심 또는 의뢰인 책임 사유로 인한 전액 환불이
              불가능합니다.
              <br />
              <br />
            </TabPane>
            <TabPane tab="실 구매자 후기" key="3">
              {reviews.length ? (
                <div style={{ marginTop: 10 }}>
                  <h4
                    style={{
                      marginBottom: 20,
                      textAlign: "center"
                    }}
                  >
                    이 마케터와 실제 진행했던 소중한 후기 입니다.
                  </h4>

                  <Divider />
                  {reviews.map(review => (
                    <div>
                      <div style={{ display: "flex", marginLeft: 10 }}>
                        <Avatar src={review.profile_url} size={50} />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: 14
                          }}
                        >
                          <div style={{ fontWeight: 600, fontSize: 15 }}>
                            {review.nickname}
                          </div>
                          <Rate
                            allowHalf
                            disabled
                            value={review.star}
                            style={{ fontSize: "14px" }}
                          />
                          <div style={{ marginTop: 12, marginBottom: 8 }}>
                            {review.content}
                          </div>
                          <div style={{ fontSize: 13 }}>
                            {review.created_at.slice(0, 10)}
                          </div>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  ))}
                </div>
              ) : (
                // <div>리뷰가 없습니다.</div>
                <>
                  <Divider />
                  <Empty
                    description={<span>아직 리뷰가 없습니다.</span>}
                    style={{ margin: "70px auto" }}
                  />
                  <Divider />
                </>
              )}
            </TabPane>
          </Tabs>
        </div>
      </div>
    ) : (
      <Spin tip="Loading..." className="spin" />
    );
  }
}

export default withRouter(MarketerDetail);
