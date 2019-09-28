import React, { Component } from "react";
import { Redirect } from "react-router";

import {
  Layout,
  Menu,
  Avatar,
  Button,
  Icon,
  Breadcrumb,
  Modal,
  Upload,
  Input
} from "antd";
import "./Mypage.css";
import ReactStars from "react-stars";
import ImgCrop from "antd-img-crop";
import OrderList from "./OrderList";
import AddMarketer from "./AddMarketer";
import AddMarketerEdu from "./AddMarketerEdu";
import FixMarketerInfo from "./FixMarketerInfo";
import FixPassword from "./FixPassword";
import DeleteUser from "./DeleteUser";
import baseURL from "../../baseURL";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Mypage extends Component {
  state = {
    menuKey: "1",
    menuTitle: "거래 내역 조회",
    profileModalVisiable: false,
    nicknameModalVisiable: false,
    file: null,
    uploading: false,
    loading: false,
    nicknameCheck: null,
    changeNickname: null
  };

  showModal(modal) {
    if (modal === 1) {
      this.setState({
        profileModalVisiable: true
      });
    } else {
      this.setState({
        nicknameModalVisiable: true
      });
    }
  }

  defaultProfile = async () => {
    const token = await sessionStorage.getItem("token");

    fetch(baseURL + "/users/profile_img/default", {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.props.getUserData();
        }
      });
  };

  nicknameCheck(nickname) {
    fetch(`${baseURL}/users/verify?nickname=${nickname}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            nicknameCheck: true,
            changeNickname: nickname
          });
        } else {
          this.setState({
            nicknameCheck: false
          });
        }
      });
  }

  async changeNickname(nickname) {
    const token = await sessionStorage.getItem("token");
    let data = {
      newNickName: nickname
    };

    fetch(baseURL + "/users/nickname", {
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
          this.setState({
            nicknameCheck: null,
            changeNickname: null,
            nicknameModalVisiable: false
          });
        }
        this.props.getUserData();
      });
  }

  handleProfileUpload = async () => {
    const token = await sessionStorage.getItem("token");
    const { file } = this.state;
    const formData = new FormData();

    formData.append("imageFile", file);

    this.setState({
      uploading: true
    });

    fetch(baseURL + "/users/profile_img", {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`
      },
      body: formData
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          this.setState({
            file: null,
            uploading: false,
            profileModalVisiable: false
          });
          this.props.getUserData();
        }
      });
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    const { uploading, file } = this.state;
    const props = {
      beforeUpload: file => {
        getBase64(file, imageUrl => {
          this.setState({
            file: file,
            imageUrl
          });
        });
        return false;
      }
    };

    if (this.props.userInfo !== null) {
      return (
        <>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>마이페이지</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.menuTitle}</Breadcrumb.Item>
            </Breadcrumb>

            <Layout style={{ padding: "24px 0", background: "#fff" }}>
              <Sider
                breakpoint="xs"
                width="250"
                collapsedWidth="0"
                className="sider-wrapper"
              >
                <div className="user-wrapper">
                  <Avatar src={this.props.userInfo.profile_url} size={80} />
                  <Button
                    style={{ marginTop: 10 }}
                    size="small"
                    onClick={() => {
                      this.showModal(1);
                    }}
                  >
                    편집
                  </Button>
                  <Modal
                    width={200}
                    style={{ textAlign: "center" }}
                    title="프로필 변경"
                    visible={this.state.profileModalVisiable}
                    footer={null}
                    onCancel={() => {
                      this.setState({
                        profileModalVisiable: false,
                        fileList: [],
                        file: null,
                        uploading: false,
                        loading: false
                      });
                    }}
                  >
                    {/* ----- */}

                    <ImgCrop>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        {...props}
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </ImgCrop>
                    <div>
                      <Button
                        type="default"
                        size="small"
                        onClick={this.defaultProfile}
                        style={{ marginTop: 16 }}
                      >
                        기본 이미지
                      </Button>
                    </div>

                    <Button
                      type="primary"
                      onClick={this.handleProfileUpload}
                      disabled={file === null}
                      loading={uploading}
                      style={{ marginTop: 16 }}
                      block
                    >
                      변경하기
                    </Button>
                  </Modal>
                  <div className="marginBottom">
                    <span style={{ marginRight: 5 }}>
                      {this.props.userInfo.nickname}
                    </span>
                    <Button
                      size="small"
                      onClick={() => {
                        this.showModal(2);
                      }}
                    >
                      편집
                    </Button>
                    <Modal
                      title="닉네임 변경"
                      visible={this.state.nicknameModalVisiable}
                      footer={null}
                      onCancel={() => {
                        this.setState({
                          nicknameModalVisiable: false,
                          nicknameCheck: null,
                          changeNickname: null
                        });
                      }}
                    >
                      <Search
                        placeholder="input search text"
                        enterButton="중복검사"
                        size="large"
                        onChange={() => {
                          this.setState({
                            nicknameCheck: null,
                            changeNickname: null
                          });
                        }}
                        onSearch={value => {
                          let pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
                          let valueCheck = pattern.exec(value);
                          if (valueCheck !== null) {
                            this.nicknameCheck(value);
                          } else {
                            alert(
                              "닉네임은 한글 / 숫자 / 영문 만 사용하실 수 있습니다."
                            );
                          }
                        }}
                      />
                      {this.state.nicknameCheck === true ? (
                        <p style={{ color: "green" }}>
                          사용 가능한 닉네임 입니다.
                        </p>
                      ) : this.state.nicknameCheck === false ? (
                        <p style={{ color: "red" }}>
                          이미 사용중인 닉네임 입니다.
                        </p>
                      ) : null}
                      <p style={{ color: "red" }}>
                        닉네임은 한글 / 숫자 / 영문 만 사용하실 수 있습니다.
                      </p>
                      <Button
                        type="primary"
                        onClick={() => {
                          this.changeNickname(this.state.changeNickname);
                        }}
                        disabled={this.state.changeNickname === null}
                        style={{ marginTop: 16 }}
                      >
                        변경하기
                      </Button>
                    </Modal>
                  </div>
                  <ReactStars count={5} value={5} edit={false} />
                </div>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  // style={{ height: "100%" }}
                >
                  <Menu.Item
                    key="1"
                    onClick={e => {
                      this.setState({
                        menuKey: e.key,
                        menuTitle: "거래 내역 조회"
                      });
                    }}
                  >
                    거래 내역 조회
                  </Menu.Item>
                  <SubMenu key="sub1" title={<span>마케터 관리</span>}>
                    <Menu.Item
                      key="2"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "마케터 교육 신청"
                        });
                      }}
                    >
                      마케터 교육 신청
                    </Menu.Item>
                    <Menu.Item
                      key="3"
                      onClick={e => {
                        // if (this.props.userInfo.status > 3) {
                        //   this.setState({
                        //     menuKey: e.key,
                        //     menuTitle: "마케터 등록/수정"
                        //   });
                        // } else {
                        //   alert("시험을 통과해주세요");
                        // }
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "마케터 등록/수정"
                        });
                      }}
                    >
                      마케터 등록/수정
                    </Menu.Item>
                    {/* <Menu.Item
                      key="4"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "마케터 정보 수정"
                        });
                      }}
                    >
                      마케터 정보 수정
                    </Menu.Item> */}
                  </SubMenu>
                  <SubMenu key="sub2" title={<span>계정 관리</span>}>
                    <Menu.Item
                      key="5"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "비밀번호 변경"
                        });
                      }}
                    >
                      비밀번호 변경
                    </Menu.Item>
                    <Menu.Item
                      key="6"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "회원 탈퇴"
                        });
                      }}
                    >
                      회원 탈퇴
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content className="mypage-content">
                {this.state.menuKey === "1" ? (
                  <OrderList />
                ) : this.state.menuKey === "2" ? (
                  <AddMarketerEdu />
                ) : this.state.menuKey === "3" ? (
                  <AddMarketer user={this.props.userInfo} />
                ) : this.state.menuKey === "4" ? (
                  <FixMarketerInfo />
                ) : this.state.menuKey === "5" ? (
                  <FixPassword />
                ) : (
                  <DeleteUser />
                )}
              </Content>
            </Layout>
          </Content>
        </>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Mypage;
