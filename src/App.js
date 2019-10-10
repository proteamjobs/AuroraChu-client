import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Signin from "./pages/Oauth/Signin";
import Signup from "./pages/Oauth/Signup";
import NotMatch from "./pages/NotMatch";
import MyClassroom from "./pages/MyClassroom";
import Mypage from "./pages/Mypage";
import MarketerDetail from "./pages/MarketerDetail";
import Chat from "./pages/Chat";
import CustomHeader from "./components/Header";
import { Layout } from "antd";
import { gray } from "ansi-colors";
import baseURL from "./baseURL";
import Marketers from "./pages/Marketers";
import Gate from "./pages/Gate";

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    userInfo: null,
    adminCheck: false
  };

  resetUserData = () => {
    this.setState({
      userInfo: null
    });
  };

  getUserData = async () => {
    const token = await sessionStorage.getItem("token");

    if (token !== null) {
      fetch(baseURL + "/auth/me", {
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(res => res.json())
        .then(async json => {
          if (json.success) {
            await this.setState({
              userInfo: json.user
            });
          }
        });
    }
  };
  componentDidMount = async () => {
    await this.getUserData();
    if (await sessionStorage.getItem("adminCheck")) {
      this.setState({ adminCheck: true });
    }
  };

  handleAdminCheck = async () => {
    await sessionStorage.setItem("adminCheck", true);
    console.log(await sessionStorage.getItem("adminCheck"));
    this.setState({ adminCheck: true });
  };

  render() {
    if (!this.state.adminCheck) {
      return <Gate handleAdminCheck={this.handleAdminCheck} />;
    } else {
      if (this.state.userInfo !== false) {
        return (
          <Router>
            <Layout
              style={{
                minHeight: "100vh",
                margin: "auto",
                backgroundColor: "#FFF"
              }}
            >
              <Header
                style={{ padding: 0, height: "100px", background: "none" }}
              >
                <CustomHeader
                  userInfo={this.state.userInfo}
                  getUserData={this.getUserData}
                  resetUserData={this.resetUserData}
                />
              </Header>
              <Layout
                style={{
                  maxWidth: "1170px",
                  width: "100%",
                  margin: "auto",
                  backgroundColor: "#FFF"
                }}
              >
                <Content>
                  <Switch>
                    <Route exact path="/" component={Main} />
                    <Route
                      path="/signup"
                      component={() => (
                        <Signup
                          getUserData={this.getUserData}
                          userInfo={this.state.userInfo}
                        />
                      )}
                    />
                    <Route
                      path="/signin"
                      component={() => (
                        <Signin getUserData={this.getUserData}></Signin>
                      )}
                    />
                    <Route
                      path="/myclassroom"
                      component={() => (
                        <MyClassroom
                          userInfo={this.state.userInfo}
                          getUserData={this.getUserData}
                        ></MyClassroom>
                      )}
                    />

                    <Route
                      path="/marketers/@:nickname"
                      component={() => (
                        <MarketerDetail
                          userInfo={this.state.userInfo}
                          getUserData={this.getUserData}
                        ></MarketerDetail>
                      )}
                    />
                    <Route
                      path="/marketers/:category"
                      component={() => <Marketers />}
                    />
                    <Route path="/marketers" component={() => <Marketers />} />

                    <Route
                      path="/mypage"
                      component={() => (
                        <Mypage
                          userInfo={this.state.userInfo}
                          getUserData={this.getUserData}
                        ></Mypage>
                      )}
                    />
                    {/* <Route
                    path="/marketer/:nickname"
                    component={() => (
                      <MarketerDetail
                        userInfo={this.state.userInfo}
                        getUserData={this.getUserData}
                      ></MarketerDetail>
                    )}
                  /> */}
                    <Route
                      path="/chat"
                      component={() => (
                        <Chat
                          userInfo={this.state.userInfo}
                          getUserData={this.getUserData}
                        />
                      )}
                    />

                    <Route component={NotMatch} />
                  </Switch>
                </Content>
              </Layout>
              <Footer
                style={{
                  textAlign: "center",
                  maxWidth: "100%",
                  backgroundColor: { gray },
                  fontSize: "11px",
                  justifyContent: "flex-end"
                }}
              >
                <span>웨이컵은 판매 당사자가 아니며 중매자 입니다.</span>
                <br />
                <span>
                  따라서 개별 마케터가 등록하여 판매한 모든 상품에 대한 거래정보
                  및 거래에 대한 책임은 각 판매자가 부담하고, 이에 대하여
                  웨이컵은 일체 책임지지 않습니다.
                </span>
                <br />
                <span>
                  커넥트마케팅연구소(유) | 박하솜 | 010-0000-0000 | 전라북도
                  전주시 | 사업자 등록번호 : 000-00-00000
                </span>
                <br />
                <span>
                  Copyright © 2019 커넥트마케팅연구소 Inc. All rights reserved.
                </span>
                <br></br>
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                  개인정보처리방침
                </span>
              </Footer>
            </Layout>
          </Router>
        );
      } else {
        return <div>Loding...</div>;
      }
    }
  }
}

export default App;
