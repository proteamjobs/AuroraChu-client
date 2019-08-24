import React, { Component } from "react";
import Store from "../mobx/signinStore";
import { observer } from "mobx-react";
import { Button, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";

@observer
class Header extends Component {
  state = {
    userInfo: null
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
    if (this.state.userInfo !== null) {
      const menu = (
        <Menu>
          <Menu.Item>
            <Link to="/mypage">마이페이지</Link>
          </Menu.Item>
          <Menu.Item
            onClick={async () => {
              await sessionStorage.clear();
              await this.setState({
                userInfo: null
              });
            }}
          >
            <Link to="/">로그아웃</Link>
          </Menu.Item>
        </Menu>
      );
      return (
        <div className="header">
          <div
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 20
            }}
          >
            Aurora Chu
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20
            }}
          >
            <div style={{ marginRight: 20 }}>나의 강의실</div>
            <div style={{ marginRight: 20 }}>블로그마케팅</div>

            <Dropdown overlay={menu}>
              <img
                src={this.state.userInfo.profile_url}
                style={{ width: 50, height: 50 }}
              />
            </Dropdown>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 20
            }}
          >
            Aurora Chu
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20
            }}
          >
            <div style={{ marginRight: 20 }}>블로그마케팅</div>
            <Button
              onClick={() => {
                this.props.history.push("/signin");
              }}
            >
              로그인
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default Header;
