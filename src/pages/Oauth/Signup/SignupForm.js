import React, { useState } from "react";
import { Checkbox, Modal, Button, Form, Input, Icon, message } from "antd";
import "antd/dist/antd.css";
import "./SignupForm.css";
import axios from "axios";
import baseURL from "../../../baseURL";
import handleLogin from "../../../module/Login";
import { serviceTermsText, collectionText } from "../../../doc/SignUp";

function RegistrationForm(props) {
  const [checkAge, setCheckAge] = useState(false);
  const [checkService, setCheckService] = useState(false);
  const [checkPrivateInfo, setCheckPrivateInfo] = useState(false);
  const [checkMarketing, setCheckMarketing] = useState(false);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [privateInfoModalVisible, setPrivateInfoModalVisible] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      const { email, password, agreementMarketing } = values;
      if (!err) {
        axios
          .post(baseURL + "/users", {
            email: email,
            password: password,
            marketingReceiveAgree: agreementMarketing
          })
          .then(async res => {
            if (res.data.success) {
              let isResultHandleLogin = await handleLogin(
                email,
                password,
                props
              );

              if (isResultHandleLogin) {
                message.success("회원가입 성공!", 3);
              } else {
                message.error("Error. 잠시 후 다시 시도해주세요", 1);
              }
            } else {
              message.error("Error. 잠시 후 다시 시도해주세요", 1, () =>
                props.history.push("/signup")
              );
            }
          });
      }
    });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("비밀번호가 일치하지 않습니다.");
    } else {
      callback();
    }
  };

  const duplicationCheck = (rule, value, callback) => {
    axios.get(`${baseURL}/auth/verify?email=${value}`).then(res => {
      if (!res.data.success) {
        callback("이미 가입된 이메일입니다.");
      } else {
        callback();
      }
    });
  };

  const checkedAgreementAge = (rule, value, callback) => {
    if (!value) {
      callback("만 14세 이상만 가입 가능합니다");
    } else {
      callback();
    }
  };

  const checkedAgreementService = (rule, value, callback) => {
    if (!value) {
      callback("서비스 이용 약관 동의는 필수입니다");
    } else {
      callback();
    }
  };

  const checkedAgreementPrivateInfo = (rule, value, callback) => {
    if (!value) {
      callback("개인정보 수집 및 이용 동의는 필수입니다");
    } else {
      callback();
    }
  };

  const onCheckAgeChange = e => {
    setCheckAge(e.target.checked);
  };

  const onCheckServiceChange = e => {
    setCheckService(e.target.checked);
  };

  const onCheckPrivateInfoChange = e => {
    setCheckPrivateInfo(e.target.checked);
  };

  const onCheckMarketingChange = e => {
    setCheckMarketing(e.target.checked);
  };

  const showServiceModal = () => {
    setServiceModalVisible(true);
  };

  const handleServiceOk = () => {
    setServiceModalVisible(false);
  };

  const handleServiceCancel = () => {
    setServiceModalVisible(false);
  };

  const showPrivateInfoModal = () => {
    setPrivateInfoModalVisible(true);
  };

  const handlePrivateInfoOk = () => {
    setPrivateInfoModalVisible(false);
  };

  const handlePrivateInfoCancel = () => {
    setPrivateInfoModalVisible(false);
  };

  const { getFieldDecorator } = props.form;

  return (
    <Form onSubmit={handleSubmit} className="signup-form">
      <div className="title">회원가입</div>
      <div className="id-password-form">
        <Form.Item hasFeedback>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "이메일 형식을 확인해주세요."
              },
              {
                required: true,
                message: "이메일을 입력해주세요."
              },
              {
                validator: duplicationCheck
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "비밀번호를 입력해주세요."
              },
              {
                pattern: /^(?=.*[\d])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,

                message:
                  "최소 8자리이상의 영문자, 숫자, 특수문자 조합으로 입력해주세요."
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "비밀번호를 다시 한 번 입력해주세요."
              },
              {
                validator: compareToFirstPassword
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
      </div>
      <div>
        <div className="subtitle">이용 약관 동의</div>
        <Form.Item className="agreement-form-item">
          {getFieldDecorator("agreementAge", {
            valuePropName: "checked",
            rules: [{ validator: checkedAgreementAge }]
          })(
            <div>
              <Checkbox checked={checkAge} onChange={onCheckAgeChange}>
                만 14세 이상입니다 (필수)
              </Checkbox>
            </div>
          )}
        </Form.Item>
        <Form.Item className="agreement-form-item">
          {getFieldDecorator("agreementService", {
            valuePropName: "checked",
            rules: [{ validator: checkedAgreementService }]
          })(
            <div>
              <Checkbox checked={checkService} onChange={onCheckServiceChange}>
                서비스 이용 약관 동의 (필수)
              </Checkbox>
              <Button type="primary" size="small" onClick={showServiceModal}>
                내용보기
              </Button>
              <Modal
                title="서비스 이용 약관 동의"
                visible={serviceModalVisible}
                onOk={handleServiceOk}
                onCancel={handleServiceCancel}
                style={{ whiteSpace: "pre-line" }}
              >
                {serviceTermsText}
              </Modal>
            </div>
          )}
        </Form.Item>
        <Form.Item className="agreement-form-item">
          {getFieldDecorator("agreementPrivateInfo", {
            valuePropName: "checked",
            rules: [{ validator: checkedAgreementPrivateInfo }]
          })(
            <div>
              <Checkbox
                checked={checkPrivateInfo}
                onChange={onCheckPrivateInfoChange}
              >
                개인정보 수집 및 이용 동의 (필수)
              </Checkbox>
              <Button
                type="primary"
                size="small"
                onClick={showPrivateInfoModal}
              >
                내용보기
              </Button>
              <Modal
                title="개인정보 수집 및 이용 동의"
                visible={privateInfoModalVisible}
                onOk={handlePrivateInfoOk}
                onCancel={handlePrivateInfoCancel}
                style={{ whiteSpace: "pre-line" }}
              >
                {collectionText}
              </Modal>
            </div>
          )}
        </Form.Item>
        <Form.Item className="agreement-form-item">
          {getFieldDecorator("agreementMarketing", {
            initialValue: false,
            valuePropName: "checked"
          })(
            <div>
              <Checkbox
                checked={checkMarketing}
                onChange={onCheckMarketingChange}
              >
                마케팅 정보 수신 동의 (선택)
              </Checkbox>
            </div>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
          >
            회원가입
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
