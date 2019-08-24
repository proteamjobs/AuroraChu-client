import React, { Component } from "react";

import {
  Layout,
  Menu,
  Spin,
  Progress,
  Avatar,
  Button,
  Radio,
  Icon,
  Breadcrumb
} from "antd";
import "./Mypage.css";
import ReactStars from "react-stars";

import CustomHeader from "../../components/Header";

import OrderList from "./OrderList";
import AddMarketer from "./AddMarketer";
import AddMarketerEdu from "./AddMarketerEdu";
import FixMarketerInfo from "./FixMarketerInfo";
import FixPassword from "./FixPassword";
import DeleteUser from "./DeleteUser";

import Store from "../../mobx/signinStore";
import { observer } from "mobx-react";
const { Content, Sider, Header, Footer } = Layout;
const { SubMenu } = Menu;

@observer
class Mypage extends Component {
  state = {
    menuKey: "1",
    menuTitle: "거래 내역 조회",
    userInfo: {}
  };

  async getUserData() {
    const token = await sessionStorage.getItem("token");

    console.log(token);
    if (token !== null) {
      fetch("http://13.209.78.148:8080/auth/me", {
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          if (json.success) {
            this.setState({
              userInfo: json.user
            });
          }
          console.log(this.state);
        });
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    if (this.state.userInfo !== {}) {
      return (
        <Layout className="layout">
          <Header style={{ padding: 0 }}>
            <CustomHeader />
          </Header>

          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>마이페이지</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.menuTitle}</Breadcrumb.Item>
            </Breadcrumb>

            <Layout style={{ padding: "24px 0", background: "#fff" }}>
              <Sider
                breakpoint="xs"
                width="250"
                collapsedWidth="0"
                className="sider-wrapper"
              >
                <div className="user-wrapper">
                  <img
                    src={this.state.userInfo.profile_url}
                    style={{ width: 80, height: 80 }}
                  />
                  <div className="marinBottom">
                    {this.state.userInfo.nickname}
                  </div>
                  <ReactStars count={5} value={5} edit={false} />
                </div>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  // style={{ height: "100%" }}
                >
                  <Menu.Item
                    key="1"
                    onClick={e => {
                      this.setState({
                        menuKey: e.key,
                        menuTitle: "거래 내역 조회"
                      });
                    }}
                  >
                    거래 내역 조회
                  </Menu.Item>
                  <SubMenu key="sub1" title={<span>마케터 관리</span>}>
                    <Menu.Item
                      key="2"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "마케터 교육 신청"
                        });
                      }}
                    >
                      마케터 교육 신청
                    </Menu.Item>
                    <Menu.Item
                      key="3"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "마케터 신청"
                        });
                      }}
                    >
                      마케터 신청
                    </Menu.Item>
                    <Menu.Item
                      key="4"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "마케터 정보 수정"
                        });
                      }}
                    >
                      마케터 정보 수정
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span>계정 관리</span>}>
                    <Menu.Item
                      key="5"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "비밀번호 변경"
                        });
                      }}
                    >
                      비밀번호 변경
                    </Menu.Item>
                    <Menu.Item
                      key="6"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "회원 탈퇴"
                        });
                      }}
                    >
                      회원 탈퇴
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                {this.state.menuKey === "1" ? (
                  <OrderList />
                ) : this.state.menuKey === "2" ? (
                  <AddMarketerEdu />
                ) : this.state.menuKey === "3" ? (
                  <AddMarketer />
                ) : this.state.menuKey === "4" ? (
                  <FixMarketerInfo />
                ) : this.state.menuKey === "5" ? (
                  <FixPassword />
                ) : (
                  <DeleteUser />
                )}
              </Content>
            </Layout>
          </Content>

          <Footer
            style={{
              textAlign: "center",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%"
            }}
          >
            <span>ㅇㅇㅇ은 판매 당사자가 아니며 중매자 입니다.</span>
            <br />
            <span>
              따라서 개별 마케터가 등록하여 판매한 모든 상품에 대한 거래정보 및
              거래에 대한 책임은 각 판매자가 부담하고, 이에 대하여 ㅇㅇㅇ은 일체
              책임지지 않습니다.
            </span>
            <br />
            <span>
              커넥트마케팅연구소(유) | 박하솜 | 010-0000-0000 | 전라북도 전주시
              | 사업자 등록번호 : 000-00-00000
            </span>
            <br />
            <span>Copyright © 2019 000 Inc. All rights reserved.</span>
          </Footer>
        </Layout>
      );
    }
  }
}

export default Mypage;
