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

class DeleteUser extends Component {
  state = {
    success: null
  };

  handleSubmit = async e => {
    const token = await sessionStorage.getItem("token");

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          password: values.password
        };
        fetch(baseURL + "/users/withdrawal", {
          method: "PUT",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(json => {
            if (json.success) {
              sessionStorage.clear();
              window.location.reload();
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
        <Form style={{ width: "80%" }} layout={"vertical"}>
          <Form.Item label="비밀번호">
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "비밀번호를 입력해주세요!" }]
            })(<Input.Password />)}
          </Form.Item>

          <p style={{ textAlign: "center" }}>
            회원 탈퇴 시 회원님의 정보는 삭제 됩니다.
          </p>
          <p style={{ textAlign: "center" }}>정말 탈퇴하시겠습니까?</p>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                this.handleSubmit();
              }}
              type="primary"
              htmlType="submit"
            >
              탈퇴하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedApp = Form.create({ name: "coordinated" })(DeleteUser);

export default WrappedApp;
