import React, { Component } from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import MainMarketersList from "../../components/MainMarketersList";

import { Carousel, Layout } from "antd";
import { withRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "./Main.css";

// import Store from "../../mobx/signinStore";
import { observer } from "mobx-react";
import MainNewMarketer from "./MainNewMarketer";

const { Content } = Layout;
@observer
class Main extends Component {
  render() {
    return (
      <Content>
        {/* <Header history={this.props.history} /> */}
        {/* <div className="main"> */}
        <Carousel autoplay>
          <div>
            {/* <h3>1</h3> */}
            <img
              src={
                "https://wake-up-file-server.s3.ap-northeast-2.amazonaws.com/slide-banner/000.png"
              }
              alt=""
            />
          </div>
          <div>
            {/* <h3>1</h3> */}
            <img
              src={
                "https://wake-up-file-server.s3.ap-northeast-2.amazonaws.com/slide-banner/000.png"
              }
              alt=""
            />
          </div>
        </Carousel>
        {/* <div className="main_banner">
            <p className="main_banner_text">Hello World!</p>
          </div> */}
        <div>
          {/* <MainMarketersList /> */}
          <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
            최근 등록한 마케터
          </span>
          <MainNewMarketer />
        </div>
        {/* </div> */}
        {/* <Footer /> */}
      </Content>
    );
  }
}

export default withRouter(Main);
