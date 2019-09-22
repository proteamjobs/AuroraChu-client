import React, { Component } from "react";
import { Tabs, Spin, Avatar, Button, Rate, Select } from "antd";
import axios from "axios";

class MarketerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marketer_info: null,
      post: null,
      reviews: []
    };
  }

  componentDidMount() {
    axios.get("http://13.124.88.11:8080/marketers/@중사캐로로").then(res => {
      console.log(res);
      if (res.data.success) {
        this.setState({
          marketer_info: res.data.marketer_info,
          post: res.data.post,
          reviews: res.data.reviews
        });
      }
    });
  }

  render() {
    const { Option } = Select;
    const { TabPane } = Tabs;
    const { marketer_info, post, reviews } = this.state;
    console.log(marketer_info, post, reviews);

    return marketer_info && post ? (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div>
            <img src={post.image_url} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <Avatar src={marketer_info.profile_url} size={60} />
              <div>
                <div>{marketer_info.nickname}</div>
                <Rate
                  allowHalf
                  disabled
                  value={marketer_info.avg_star}
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div>{post.title}</div>
            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>9000원</div>
                <div>블로그 원고 작성 500자 이상</div>
                <div>{post.avg_duration}일</div>
                <div style={{ display: "flex" }}>
                  <div>수량</div>
                  <div>
                    <Select
                      defaultValue="1"
                      style={{ width: 120 }}
                      onChange={() => {}}
                    >
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                      <Option value="5">5</Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <Button>문의 하기</Button>
                  <Button>구매 하기</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tabs defaultActiveKey="1" onChange={() => {}}>
            <TabPane tab="상세 정보" key="1">
              {post.content}
            </TabPane>
            <TabPane tab="취소 및 환불규정" key="2">
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
                reviews.map(review => (
                  <div style={{ display: "flex" }}>
                    <Avatar src={review.profile_url} size={40} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div>{review.nickname}</div>
                      <Rate
                        allowHalf
                        disabled
                        value={review.star}
                        style={{ fontSize: "14px" }}
                      />
                      <div>{review.content}</div>
                      <div>{review.created_at}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div>리뷰가 없습니다.</div>
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

export default MarketerDetail;
