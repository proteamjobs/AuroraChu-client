import React, { Component } from "react";
import { Button, Dropdown, Menu, Avatar, Icon, Divider } from "antd";
import { Link } from "react-router-dom";
import "./styles.css";

class Header extends Component {
  componentDidMount = async () => {};

  render() {
    const Logo = () => (
      <img
        src="/Logo/Logo7.png"
        alt=""
        style={{ width: "140px", paddingLeft: "10px" }}
      />
    );
    if (this.props.userInfo !== null) {
      const menu = (
        <Menu>
          <Menu.Item>
            <Link to="/mypage">마이페이지</Link>
          </Menu.Item>
          <Menu.Item
            onClick={async () => {
              await sessionStorage.clear();
              await this.props.resetUserData();
            }}
          >
            <Link to="/">로그아웃</Link>
          </Menu.Item>
        </Menu>
      );
      return (
        <>
          <div className="header">
            <div className="header_content">
              <div
                style={{
                  fontSize: "1.313rem",
                  fontWeight: "bold",
                  marginLeft: 20
                }}
              >
                <Link to={"/"} style={{ color: "white" }}>
                  {/* Wake-Up */}
                  <Logo />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: "#037756",
                      padding: "1px 5px 2px 5px",
                      borderRadius: "7px",
                      marginLeft: "5px"
                    }}
                  >
                    BETA
                  </span>
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20
                }}
              >
                {/* <Link to={"/myclassroom"}>
                <div
                  style={{
                    marginRight: 20,
                    color: "black",
                    fontSize: "0.9375rem"
                  }}
                >
                  나의 강의실
                </div>
              </Link>

              <Link to="/marketers">
                <div
                  style={{
                    marginRight: 20,
                    color: "black",
                    fontSize: "0.9375rem"
                  }}
                >
                  블로그마케팅
                </div>
              </Link> */}

                <Dropdown overlay={menu}>
                  <div className="header_user">
                    <Avatar size={35} src={this.props.userInfo.profile_url} />
                    <span style={{ padding: "10px", fontSize: "0.845rem" }}>
                      {this.props.userInfo.nickname}
                    </span>
                    <Icon type="down" />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
          <Divider style={{ margin: 0 }} />

          <div className="header_menu">
            <div className="header_wrap">
              <Link to={"/myclassroom"}>
                <div
                  style={{
                    marginRight: 20,
                    color: "black",
                    fontSize: "0.9375rem"
                  }}
                >
                  나의 강의실
                </div>
              </Link>

              <Link to="/marketers">
                <div
                  style={{
                    marginRight: 20,
                    color: "black",
                    fontSize: "0.9375rem"
                  }}
                >
                  블로그마케팅
                </div>
              </Link>
            </div>
          </div>

          <Divider style={{ margin: 0 }} />
        </>
      );
    } else {
      return (
        <>
          <div className="header">
            <div className="header_content">
              <div
                style={{
                  fontSize: "1.313rem",
                  fontWeight: "bold",
                  marginLeft: 20
                }}
              >
                <Link to={"/"} style={{ color: "white" }}>
                  {/* Wake-Up  */}
                  <Logo />

                  <span
                    style={{
                      fontSize: "0.75rem",
                      backgroundColor: "#037756",
                      padding: "1px 5px 2px 5px",
                      borderRadius: "7px",
                      marginLeft: "5px"
                    }}
                  >
                    BETA
                  </span>
                </Link>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 20
                }}
              >
                {/* <Link to="/marketers">
                <div
                  style={{
                    marginRight: 20,
                    color: "black",
                    fontSize: "0.9375rem"
                  }}
                >
                  블로그마케팅
                </div>
              </Link> */}
                <Link to={"/signin"}>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#049f73",
                      borderColor: "#049f73",
                      borderRadius: "5px"
                    }}
                  >
                    로그인
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <Divider style={{ margin: 0 }} />

          <div className="header_menu">
            <div className="header_wrap">
              <Link to="/marketers">
                <div
                  style={{
                    marginRight: 20,
                    color: "black",
                    fontSize: "0.9375rem"
                  }}
                >
                  블로그마케팅
                </div>
              </Link>
            </div>
          </div>
          <Divider style={{ margin: 0 }} />
        </>
      );
    }
  }
}

export default Header;
