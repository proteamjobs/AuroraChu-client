import React, { Component } from "react";
import {
  // Layout,
  // Menu,
  // Spin,
  // Progress,
  // Avatar,
  // Radio,
  // Icon,
  // Breadcrumb,
  // Modal,
  Button,
  Form,
  Input
} from "antd";
import baseURL from "../../baseURL";

class FixPassword extends Component {
  state = {
    success: null
  };

  handleSubmit = async e => {
    const token = await sessionStorage.getItem("token");

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        let data = {
          oldPassword: values.password,
          newPassword: values.newPassword
        };
        fetch(baseURL + "/users/password", {
          method: "PUT",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(json => {
            console.log(json);
            if (json.success) {
              alert("비밀번호 변경 완료!");
            } else {
              alert("실패하였습니다. 다시 시도해주세요!");
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Form
          // onSubmit={() => {
          //   this.handleSubmit();
          // }}
          style={{ width: "80%" }}
          layout={"vertical"}
        >
          <Form.Item label="이전 비밀번호">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "기존 비밀번호를 입력해주세요!" }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="새로운 비밀번호">
            {getFieldDecorator("newPassword", {
              rules: [
                { required: true, message: "새로운 비밀번호를 입력해주세요!" },
                {
                  pattern: /^(?=.*[\d])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,

                  message:
                    "최소 8자리이상의 영문자, 숫자, 특수문자 조합으로 입력해주세요."
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="새로운 비밀번호 확인">
            {getFieldDecorator("newPasswordReplay", {
              rules: [
                { required: true, message: "새로운 비밀번호를 입력해주세요!" },
                {
                  pattern: /^(?=.*[\d])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,

                  message:
                    "최소 8자리이상의 영문자, 숫자, 특수문자 조합으로 입력해주세요."
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => {
                this.handleSubmit();
              }}
              type="primary"
              htmlType="submit"
            >
              변경하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedApp = Form.create({ name: "coordinated" })(FixPassword);

export default WrappedApp;
