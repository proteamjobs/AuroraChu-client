import React, { Component } from "react";
import Store from "../mobx/signinStore";
import { observer } from "mobx-react";

@observer
class Header extends Component {
  render() {
    if (Store.isLogin) {
      return (
        <div className="header">
          <div
            style={{ display: "flex", flexDirection: "row", paddingLeft: 10 }}
          >
            <div
              style={{
                width: 25,
                height: 25,
                borderRadius: 50,
                backgroundColor: "red"
              }}
            >
              로고
            </div>
            <span style={{ fontSize: 20 }}>Aurora</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingRight: 10,
              alignItems: "center"
            }}
          >
            <span
              style={{ paddingRight: 10, fontSize: 16 }}
              onClick={() => this.props.history.push("/myclassroom")}
            >
              나의 강의실
            </span>
            <span style={{ paddingRight: 10, fontSize: 16 }}>
              블로그 마케팅
            </span>
            <div
              style={{
                display: "flex",
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: "yellow",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              로고
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div
            style={{ display: "flex", flexDirection: "row", paddingLeft: 10 }}
          >
            <div
              style={{
                width: 25,
                height: 25,
                borderRadius: 50,
                backgroundColor: "red"
              }}
            >
              로고
            </div>
            <span style={{ fontSize: 20 }}>Aurora</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingRight: 10,
              alignItems: "center"
            }}
          >
            <span style={{ paddingRight: 10, fontSize: 16 }}>
              블로그 마케팅
            </span>
            <div
              style={{
                display: "flex",
                width: 100,
                height: 38,
                borderRadius: 25,
                backgroundColor: "yellow",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <button
                onClick={() => {
                  this.props.history.push("/signin");
                }}
              >
                {" "}
                로그인
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Header;
