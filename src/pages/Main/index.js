import React, { Component } from "react";
import { Carousel, Layout } from "antd";
import { withRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "./Main.css";
import MainNewMarketer from "./MainNewMarketer";

const { Content } = Layout;

class Main extends Component {
  render() {
    return (
      <Content>
        <Carousel autoplay>
          <div>
            <img
              src={
                "https://wake-up-file-server.s3.ap-northeast-2.amazonaws.com/slide-banner/000.png"
              }
              alt=""
            />
          </div>
          <div>
            <img
              src={
                "https://wake-up-file-server.s3.ap-northeast-2.amazonaws.com/slide-banner/000.png"
              }
              alt=""
            />
          </div>
        </Carousel>
        <div>
          <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
            최근 등록한 마케터
          </span>
          <MainNewMarketer />
        </div>
      </Content>
    );
  }
}

export default withRouter(Main);
