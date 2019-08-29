import React, { Component } from "react";
import Store from "../../../mobx/signinStore";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import "antd/dist/antd.css";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import axios from "axios";
import "./SigninForm.css";
import baseURL from "../../../baseURL";
import { withRouter } from "react-router-dom";

@observer
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
              await Store.storeToken(jwt);
              axios
                .get(baseURL + "/auth/me", {
                  headers: {
                    Authorization: `JWT ${jwt}`
                  }
                })
                .then(res => {
                  if (res.data.success) {
                    this.props.getUserData();
                    console.log(res.data);
                    Store.login(res.data.user);
                    toJS(Store.user);
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
      <Form onSubmit={this.handleSubmit} className="login-form">
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
