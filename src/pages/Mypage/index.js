import React, { Component } from "react";
import { Redirect } from "react-router";

import {
  // Spin,
  // Progress,
  // Radio,
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

// import CustomHeader from "../../components/Header";
// import Store from "../../mobx/signinStore";

import OrderList from "./OrderList";
import AddMarketer from "./AddMarketer";
import AddMarketerEdu from "./AddMarketerEdu";
import FixMarketerInfo from "./FixMarketerInfo";
import FixPassword from "./FixPassword";
import DeleteUser from "./DeleteUser";
import { observer } from "mobx-react";
import baseURL from "../../baseURL";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

@observer
class Mypage extends Component {
  state = {
    menuKey: "1",
    menuTitle: "거래 내역 조회",
    profileModalVisiable: false,
    nicknameModalVisiable: false,
    fileList: [],
    file: null,
    uploading: false,
    loading: false,
    nicknameCheck: null,
    changeNickname: null
  };
  // userInfo: {},

  // async getUserData() {
  //   const token = await sessionStorage.getItem("token");

  //   console.log(token);
  //   if (token !== null) {
  //     fetch("http://13.209.78.148:8080/auth/me", {
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
        console.log(json);
        if (json.success) {
          window.location.reload();
        }
      });
  };

  handleUpload = async () => {
    const token = await sessionStorage.getItem("token");
    const { fileList } = this.state;
    const { file } = this.state;
    const formData = new FormData();

    formData.append("imageFile", fileList[0]);
    // formData.append("imageFile", file);

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
            fileList: [],
            uploading: false,
            profileModalVisiable: false
          });
          // this.getUserData();
          // window.location.reload();
        }
      });
  };

  nicknameCheck(nickname) {
    fetch(`${baseURL}/users/verify?nickname=${nickname}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
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
    console.log(data);

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

  // componentDidMount() {
  //   this.props.getUserData();
  // }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        // this.setState({
        //   file: file
        // });
        return false;
      },
      fileList
    };

    if (this.props.userInfo !== null) {
      return (
        <>
          {/* <Header style={{ padding: 0 }}>
            <CustomHeader />
          </Header> */}

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
                    <ImgCrop>
                      <Upload {...props}>
                        <Button>
                          <Icon type="upload" /> Select File
                        </Button>
                      </Upload>
                    </ImgCrop>
                    <div>
                      <Button
                        type="primary"
                        onClick={this.defaultProfile}
                        style={{ marginTop: 16 }}
                      >
                        기본 이미지로 변경
                      </Button>
                    </div>
                    <Button
                      type="primary"
                      onClick={this.handleUpload}
                      disabled={fileList.length === 0}
                      loading={uploading}
                      style={{ marginTop: 16 }}
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
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "마케터 신청"
                        });
                      }}
                    >
                      마케터 신청
                    </Menu.Item>
                    <Menu.Item
                      key="4"
                      onClick={e => {
                        this.setState({
                          menuKey: e.key,
                          menuTitle: "마케터 정보 수정"
                        });
                      }}
                    >
                      마케터 정보 수정
                    </Menu.Item>
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
                  <AddMarketer />
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

          {/* <Footer
            style={{
              textAlign: "center",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%"
            }}
          >
            <span>ㅇㅇㅇ은 판매 당사자가 아니며 중매자 입니다.</span>
            <br />
            <span>
              따라서 개별 마케터가 등록하여 판매한 모든 상품에 대한 거래정보 및
              거래에 대한 책임은 각 판매자가 부담하고, 이에 대하여 ㅇㅇㅇ은 일체
              책임지지 않습니다.
            </span>
            <br />
            <span>
              커넥트마케팅연구소(유) | 박하솜 | 010-0000-0000 | 전라북도 전주시
              | 사업자 등록번호 : 000-00-00000
            </span>
            <br />
            <span>Copyright © 2019 000 Inc. All rights reserved.</span>
          </Footer> */}
        </>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Mypage;
