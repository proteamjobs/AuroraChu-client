import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import "./SigninForm.css";
import "antd/dist/antd.css";
import handleLogin from "../../../module/Login";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { email, password } = values;
      if (!err) {
        let isResultHandleLogin = handleLogin(email, password, this.props);
        if (isResultHandleLogin) {
          this.props.getUserData();
          this.props.history.push("/");
        }
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
            style={{
              backgroundColor: "#049f73",
              borderColor: "#049f73",
              borderRadius: "5px"
            }}
          >
            로그인 하기
          </Button>
        </Form.Item>
        <div className="extra-function-button-wrapper">
          <Link
            to="#"
            onClick={() => {
              alert("서비스 구현 중 입니다.");
            }}
            style={{ color: "#049f73" }}
          >
            비밀번호 찾기
          </Link>
          <Link to="/signup" style={{ color: "#049f73" }}>
            회원이 아니신가요?
          </Link>
        </div>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(LoginForm);

export default withRouter(WrappedNormalLoginForm);
