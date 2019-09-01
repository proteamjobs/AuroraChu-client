import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Signin from "./pages/Oauth/Signin";
import Signup from "./pages/Oauth/Signup";
import NotMatch from "./pages/NotMatch";
import MyClassroom from "./pages/MyClassroom";
import Mypage from "./pages/Mypage";
import CustomHeader from "./components/Header";
import { Layout } from "antd";
import { gray } from "ansi-colors";
import baseURL from "./baseURL";

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    userInfo: null
  };

  resetUserData = () => {
    this.setState({
      userInfo: null
    });
  };

  getUserData = async () => {
    const token = await sessionStorage.getItem("token");

    console.log(token);
    if (token !== null) {
      fetch(baseURL + "/auth/me", {
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
  };
  componentDidMount = async () => {
    await this.getUserData();
  };

  render() {
    if (this.state.userInfo !== false) {
      return (
        <Router>
          <Layout
            style={{
              minHeight: "100vh",
              // maxWidth: "1170px",
              margin: "auto",
              backgroundColor: "#fff"
            }}
          >
            <Layout
              style={{
                // minHeight: "100vh",
                maxWidth: "1170px",
                width: "100%",
                margin: "auto",
                backgroundColor: "#fff"
              }}
            >
              <Header style={{ padding: 0 }}>
                <CustomHeader
                  userInfo={this.state.userInfo}
                  getUserData={this.getUserData}
                  resetUserData={this.resetUserData}
                />
              </Header>
              <Content>
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route path="/signup" component={Signup} />
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
                    path="/mypage"
                    component={() => (
                      <Mypage
                        userInfo={this.state.userInfo}
                        getUserData={this.getUserData}
                      ></Mypage>
                    )}
                  />
                  <Route component={NotMatch} />
                </Switch>
              </Content>
            </Layout>
            <Footer
              style={{
                textAlign: "center",
                // position: "absolute",
                // bottom: 0,
                // left: 0,
                // right: 0,
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
                및 거래에 대한 책임은 각 판매자가 부담하고, 이에 대하여 웨이컵은
                일체 책임지지 않습니다.
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

// function App() {
//   return (
//     <Router>
//       <Layout
//         style={{
//           height: "100%",
//           maxWidth: "1170px",
//           margin: "auto",
//           backgroundColor: "#fff"
//         }}
//       >
//         <Header style={{ padding: 0 }}>
//           <CustomHeader />
//         </Header>
//         <Switch>
//           <Route exact path="/" component={Main} />
//           <Route path="/signup" component={Signup} />
//           <Route path="/signin" component={Signin} />
//           <Route path="/myclassroom" component={MyClassroom} />
//           <Route path="/mypage" component={Mypage} />
//           <Route component={NotMatch} />
//         </Switch>

//         <Footer
//           style={{
//             textAlign: "center",
//             // position: "absolute",
//             // bottom: 0,
//             // left: 0,
//             // right: 0,
//             width: "100%",
//             backgroundColor: { gray },
//             fontSize: "10px"
//           }}
//         >
//           <span>ㅇㅇㅇ은 판매 당사자가 아니며 중매자 입니다.</span>
//           <br />
//           <span>
//             따라서 개별 마케터가 등록하여 판매한 모든 상품에 대한 거래정보 및
//             거래에 대한 책임은 각 판매자가 부담하고, 이에 대하여 ㅇㅇㅇ은 일체
//             책임지지 않습니다.
//           </span>
//           <br />
//           <span>
//             커넥트마케팅연구소(유) | 박하솜 | 010-0000-0000 | 전라북도 전주시 |
//             사업자 등록번호 : 000-00-00000
//           </span>
//           <br />
//           <span>Copyright © 2019 000 Inc. All rights reserved.</span>
//         </Footer>
//       </Layout>
//     </Router>
//   );
// }

export default App;
