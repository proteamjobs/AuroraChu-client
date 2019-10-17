import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Avatar, Rate, Button, Input } from "antd";

export class Chat extends Component {
  render() {
    const { targetUserInfo, post } = this.props.location.state;
    // if (this.props.userInfo) {
    //   return <Redirect to="/" />;
    // }

    return (
      <div
        style={{
          marginLeft: 200,
          marginRight: 200,
          marginTop: 60,
          marginBottom: 120
        }}
      >
        <div style={{ marginBottom: 60 }}>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            1:1 문의 하기
          </div>
          <div style={{ fontSize: 16, marginLeft: 15 }}>
            판매자와 채팅을 통해 문의하세요.
          </div>
          <div style={{ fontSize: 16, marginLeft: 15 }}>
            단, 개인의 번호를 교환 할 수는 없습니다.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
            marginTop: 10
          }}
        >
          <Avatar
            src={targetUserInfo.profile_url}
            size={60}
            style={{ marginRight: 10 }}
          />
          <div>
            <div style={{ fontSize: 16 }}>{targetUserInfo.nickname}</div>
            <Rate
              allowHalf
              disabled
              value={targetUserInfo.avg_star}
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: 18, fontSize: 16 }}>{post.title}</div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #cacaca",
            padding: 18
          }}
        >
          <div
            style={{ display: "flex", marginBottom: 36, alignSelf: "flex-end" }}
          >
            <div
              style={{
                alignSelf: "flex-end",
                marginRight: 14,
                marginBottom: 3,
                color: "#959595",
                fontSize: 13
              }}
            >
              2019/09/21 PM 5:30
            </div>
            <div
              style={{
                border: "1px solid #959595",
                borderRadius: 8,
                padding: 10,
                maxWidth: 300,
                fontSize: 15
              }}
            >
              안녕하세요 몇일 정도 소요되나요?
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginBottom: 36
            }}
          >
            <div
              style={{
                borderRadius: 8,
                padding: 10,
                backgroundColor: "#e0e0e0",
                maxWidth: 300,
                fontSize: 15
              }}
            >
              안녕하세요. 재규어 중사입니다. 예상 일정은 보통 3일 정도 소요되나,
              필요 시 당길 수는 있을 것 같네요 ^^ 급하신 사항인가요?
            </div>
            <div
              style={{
                alignSelf: "flex-end",
                marginLeft: 14,
                marginBottom: 3,
                color: "#959595",
                fontSize: 13
              }}
            >
              2019/09/21 PM 5:42
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            border: "1px solid #cacaca",
            borderTop: "none",
            padding: "7px 12px"
          }}
        >
          <Input
            placeholder="메세지를 입력하시고 전송 버튼 혹은 Enter 키를 입력하세요."
            size="large"
          />
          <Button size="large" style={{ marginLeft: 5 }}>
            보내기
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Chat);
