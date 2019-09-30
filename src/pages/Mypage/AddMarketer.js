import React, { Component } from "react";
import category from "../../categoryList";
import {
  // Layout,
  // Menu,
  // Spin,
  // Progress,
  // Avatar,
  // Radio,
  Icon,
  // Breadcrumb,
  // Modal,
  Button,
  // Form,
  Input,
  Upload,
  Select,
  Popconfirm
} from "antd";
import baseURL from "../../baseURL";

const { Option } = Select;
const { TextArea } = Input;

class AddMarketer extends Component {
  state = {
    isMarketer: false,
    category: null,
    avgDuration: null,
    fileList: [],
    title: "",
    text: "",
    imageUrl: null,
    post: null
  };

  handleUpload = async () => {
    const token = await sessionStorage.getItem("token");
    const { fileList } = this.state;
    const formData = new FormData();

    if (fileList.length) {
      formData.append("imageFile", fileList[0]);

      fetch(baseURL + "/marketers/upload", {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`
        },
        body: formData
      })
        .then(res => res.json())
        .then(async json => {
          console.log(json);
          if (json.success) {
            await this.setState({
              imageUrl: json.image_url
            });
            if (this.state.isMarketer) {
              await this.fixPost();
            } else {
              await this.uploadPost(token);
            }
          }
        });
    } else {
      this.fixPost();
    }
  };

  uploadPost(token) {
    console.log(token);

    let { category, avgDuration, title, text, imageUrl } = this.state;

    let body = {
      category: category,
      title: title,
      content: text,
      image_url: imageUrl,
      avg_duration: avgDuration
    };
    console.log("body ::: ", body);

    fetch(baseURL + "/marketers", {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          alert("등록이 완료되었습니다.");
          this.setState({
            isMarketer: true
          });
          this.getMarketers();
        }
      });
  }

  async fixPost() {
    const token = await sessionStorage.getItem("token");

    let { category, avgDuration, title, text, imageUrl, post } = this.state;
    console.log(this.state);
    let body = {
      category: category === null ? post.category : category,
      title: title.length === 0 ? post.title : title,
      content: text.length === 0 ? post.content : text,
      image_url: imageUrl === null ? post.image_url : imageUrl,
      avg_duration: avgDuration === null ? post.avg_duration : avgDuration
    };
    console.log("body ::: ", body);

    fetch(baseURL + "/marketers", {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          alert("수정이 완료되었습니다.");
          this.setState({
            isMarketer: true
          });
          this.getMarketers();
        }
      });
  }

  getMarketers() {
    let user = this.props.user;
    fetch(`${baseURL}/Marketers/${user._id}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          this.setState({
            isMarketer: true,
            post: json.post
          });
        } else {
          this.setState({
            isMarketer: false
          });
        }
      });
  }

  async deleteMarketers() {
    const token = await sessionStorage.getItem("token");

    if (token) {
      fetch(`${baseURL}/Marketers/`, {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          if (json.success) {
            // this.getMarketers();
            window.location.reload();
          }
        });
    }
  }

  confirm(e) {
    console.log(e);
    this.deleteMarketers();
  }

  cancel(e) {
    console.log(e);
    // message.error('Click on No');
  }

  componentDidMount() {
    this.getMarketers();
  }

  render() {
    const {
      fileList,
      isMarketer,
      title,
      text,
      category,
      avgDuration,
      post
    } = this.state;
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
        return false;
      },
      fileList
    };

    if (isMarketer === false) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            paddingLeft: 30,
            paddingRight: 40,
            paddingBottom: 100
          }}
        >
          <div className="addMarketerTitle">마케터 등록/수정</div>
          <div className="selecter">
            <p>카테고리</p>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="카테고리를 선택하세요."
              optionFilterProp="children"
              onChange={value => {
                this.setState({
                  category: value
                });
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="홍보_마케팅">홍보/마케팅</Option>
              <Option value="카페_음료_베이커리">카페/음료/베이커리</Option>
              <Option value="음식점업">음식점업</Option>
              <Option value="교육_서비스업">교육 서비스업</Option>
              <Option value="도소매_제조업_유통업">도소매/제조업/유통업</Option>
              <Option value="예술_스포츠_레저_여가">
                예술/스포츠/레저/여가
              </Option>
              <Option value="미용_뷰티">미용/뷰티</Option>
              <Option value="종교">종교</Option>
              <Option value="병원_제약_복지">병원/제약/복지</Option>
              <Option value="부동산_임대_건설_숙박업">
                부동산/임대/건설/숙박업
              </Option>
              <Option value="금융_보험_투자">금융/보험/투자</Option>
              <Option value="법률_세무_회계">법률/세무/회계</Option>
              <Option value="공공기관_관공서_협회">공공기관/관공서/협회</Option>
              <Option value="기타_전문직_자영업">기타 전문직/자영업</Option>
              <Option value="학생_기타_개인">학생/기타 개인</Option>
            </Select>
          </div>

          <div className="selecter">
            <p>평균 소요일</p>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="평균 소요일을 선택하세요."
              optionFilterProp="children"
              onChange={value => {
                this.setState({
                  avgDuration: value
                });
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value={1}>1일</Option>
              <Option value={2}>2일</Option>
              <Option value={3}>3일</Option>
              <Option value={4}>4일</Option>
              <Option value={5}>5일</Option>
              <Option value={6}>6일</Option>
              <Option value={7}>7일</Option>
            </Select>
          </div>

          <div className="selecter">
            <p>대표 이미지</p>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 대표 이미지 업로드
              </Button>
            </Upload>
          </div>

          <div className="selecter">
            <p>타이틀</p>
            <Input
              placeholder="타이틀을 작성해주세요."
              onChange={e => {
                this.setState({
                  title: e.target.value
                });
              }}
            />
          </div>

          <div className="selecter">
            <p>상세 설명</p>
            <TextArea
              style={{ height: 213 }}
              placeholder="상세 설명을 작성해주세요."
              onChange={e => {
                this.setState({
                  text: e.target.value
                });
              }}
            />
          </div>

          <div style={{ textAlign: "center", marginTop: 50 }}>
            <Button
              style={{ width: 134, height: 34, backgroundColor: "#c4c4c4" }}
              onClick={() => {
                console.log(this.state);
                if (
                  category !== null &&
                  avgDuration !== null &&
                  fileList.length &&
                  title.length &&
                  text.length
                ) {
                  this.handleUpload();
                } else {
                  alert("정보를 모두 입력해주세요!");
                }
              }}
            >
              등록하기
            </Button>
          </div>
        </div>
      );
    } else if (post !== null) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            paddingLeft: 30,
            paddingRight: 40,
            paddingBottom: 100
          }}
        >
          <div className="addMarketerTitle">마케터 등록/수정</div>
          <div className="selecter">
            <p>카테고리</p>
            <Select
              showSearch
              style={{ width: 200 }}
              // value={post.category}
              placeholder={post.category}
              optionFilterProp="children"
              onChange={value => {
                this.setState({
                  category: value
                });
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="홍보_마케팅">홍보/마케팅</Option>
              <Option value="카페_음료_베이커리">카페/음료/베이커리</Option>
              <Option value="음식점업">음식점업</Option>
              <Option value="교육_서비스업">교육 서비스업</Option>
              <Option value="도소매_제조업_유통업">도소매/제조업/유통업</Option>
              <Option value="예술_스포츠_레저_여가">
                예술/스포츠/레저/여가
              </Option>
              <Option value="미용_뷰티">미용/뷰티</Option>
              <Option value="종교">종교</Option>
              <Option value="병원_제약_복지">병원/제약/복지</Option>
              <Option value="부동산_임대_건설_숙박업">
                부동산/임대/건설/숙박업
              </Option>
              <Option value="금융_보험_투자">금융/보험/투자</Option>
              <Option value="법률_세무_회계">법률/세무/회계</Option>
              <Option value="공공기관_관공서_협회">공공기관/관공서/협회</Option>
              <Option value="기타_전문직_자영업">기타 전문직/자영업</Option>
              <Option value="학생_기타_개인">학생/기타 개인</Option>
            </Select>
          </div>

          <div className="selecter">
            <p>평균 소요일</p>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder={post.avg_duration}
              // value={post.avg_duration}
              optionFilterProp="children"
              onChange={value => {
                this.setState({
                  avgDuration: value
                });
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value={1}>1일</Option>
              <Option value={2}>2일</Option>
              <Option value={3}>3일</Option>
              <Option value={4}>4일</Option>
              <Option value={5}>5일</Option>
              <Option value={6}>6일</Option>
              <Option value={7}>7일</Option>
            </Select>
          </div>

          <div className="selecter">
            <p>대표 이미지</p>
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> 대표 이미지 업로드
              </Button>
            </Upload>
          </div>

          <div className="selecter">
            <p>타이틀</p>
            <Input
              placeholder={post.title}
              // value={post.title}
              onChange={e => {
                this.setState({
                  title: e.target.value
                });
              }}
            />
          </div>

          <div className="selecter">
            <p>상세 설명</p>
            <TextArea
              style={{ height: 213 }}
              // value={post.content}
              placeholder={post.content}
              onChange={e => {
                this.setState({
                  text: e.target.value
                });
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: "25%",
              paddingRight: "25%"
            }}
          >
            {/* <Button
              style={{ width: 134, height: 34, backgroundColor: "#c4c4c4" }}
              onClick={() => {
                console.log(this.state);
                this.deleteMarketers();
              }}
            >
              삭제하기
            </Button> */}

            <Popconfirm
              title="삭제하시겠습니까?"
              onConfirm={() => this.confirm()}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ width: 134, height: 34, backgroundColor: "#c4c4c4" }}
                // onClick={() => {
                //   console.log(this.state);
                //   this.deleteMarketers();
                // }}
              >
                삭제하기
              </Button>
            </Popconfirm>

            <Popconfirm
              title="수정하시겠습니까?"
              onConfirm={() => this.handleUpload()}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ width: 134, height: 34, backgroundColor: "#c4c4c4" }}
              >
                수정하기
              </Button>
            </Popconfirm>
          </div>
        </div>
      );
    } else {
      return <div>로딩중</div>;
    }
  }
}

export default AddMarketer;
