import React, { Component } from "react";
import { observer } from "mobx-react";
import { Button, Dropdown, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
// import Store from "../mobx/signinStore";
// import baseURL from "../baseURL";

@observer
class Header extends Component {
  // state = {
  //   userInfo: null
  // };

  // async getUserData() {
  //   const token = await sessionStorage.getItem("token");

  //   console.log(token);
  //   if (token !== null) {
  //     fetch(baseURL + "/auth/me", {
  //       headers: {
  //         Authorization: `JWT ${token}`
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(json => {
  //         console.log(json);
  //         if (json.success) {
  //           this.setState({
  //             userInfo: json.user
  //           });
  //         }
  //         console.log(this.state);
  //       });
  //   }
  // }

  componentDidMount = async () => {};

  render() {
    // this.props.getUserData();
    if (this.props.userInfo !== null) {
      // if (sessionStorage.getItem("token")) {
      const menu = (
        <Menu>
          <Menu.Item>
            <Link to="/mypage">마이페이지</Link>
          </Menu.Item>
          <Menu.Item
            onClick={async () => {
              await sessionStorage.clear();
              // await this.setState({
              //   userInfo: null
              // });
              await this.props.resetUserData();
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
            <Link to={"/"} style={{ color: "white" }}>
              Wake-Up{" "}
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
            <Link to={"/myclassroom"}>
              <div style={{ marginRight: 20, color: "black" }}>나의 강의실</div>
            </Link>
            <div style={{ marginRight: 20, color: "black" }}>블로그마케팅</div>

            <Dropdown overlay={menu}>
              <Avatar size={55} src={this.props.userInfo.profile_url}></Avatar>
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
            <Link to={"/"} style={{ color: "white" }}>
              Wake-Up{" "}
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
            <div style={{ marginRight: 20 }}>블로그마케팅</div>
            <Link to={"/signin"}>
              <Button type="primary">로그인</Button>
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default Header;
