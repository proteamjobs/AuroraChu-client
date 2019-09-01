import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import "./SigninForm.css";
import "antd/dist/antd.css";
import axios from "axios";
import baseURL from "../../../baseURL";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { email, password } = values;
      if (!err) {
        axios
          .post(baseURL + "/auth/login", {
            email: email,
            password: password
          })
          .then(async res => {
            if (res.data.success) {
              let jwt = res.data.data.jwt;
              await sessionStorage.setItem("token", jwt);
              axios
                .get(baseURL + "/auth/me", {
                  headers: {
                    Authorization: `JWT ${jwt}`
                  }
                })
                .then(res => {
                  if (res.data.success) {
                    this.props.getUserData();
                    this.props.history.push("/");
                  } else {
                    alert(res.data.message);
                  }
                });
            } else {
              alert(res.data.message);
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form-container">
        <div className="title">로그인</div>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "이메일을 입력해주세요." }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              onChange={text => {
                this.setState({
                  email: text.target.value
                });
              }}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "비밀번호를 입력해주세요." }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={text => {
                this.setState({
                  password: text.target.value
                });
              }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            // style={{
            //   width: '100%',
            //   backgroundColor: "#049f73",
            //   borderColor: "#049f73",
            //   borderRadius: "5px"
            // }}
          >
            로그인 하기
          </Button>
        </Form.Item>
        <div className="extra-function-button-wrapper">
          <Link to="">비밀번호 찾기</Link>
          <Link to="/signup">회원이 아니신가요?</Link>
        </div>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);

export default withRouter(WrappedNormalLoginForm);
