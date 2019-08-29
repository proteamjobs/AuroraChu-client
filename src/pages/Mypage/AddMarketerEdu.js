import React, { Component } from "react";
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
  Form,
  Input,
  Upload
} from "antd";
import baseURL from "../../baseURL";

class AddMarketerEdu extends Component {
  state = {
    status: null,
    uploading: false,
    fileList: []
  };

  getStatus = async () => {
    const token = await sessionStorage.getItem("token");

    fetch(baseURL + "/applies/status", {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          this.setState({
            status: json.status
          });
        }
      });
  };

  handleUpload = async () => {
    const token = await sessionStorage.getItem("token");
    const { fileList } = this.state;
    const formData = new FormData();

    fileList.forEach(file => {
      formData.append("arrayFile", file);
    });

    this.setState({
      uploading: true
    });

    fetch(baseURL + "/applies", {
      method: "POST",
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
            uploading: false
          });
          this.getStatus();
        }
      });
  };

  deleteApplies = async () => {
    const token = await sessionStorage.getItem("token");

    fetch(baseURL + "/applies", {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.success) {
          this.getStatus();
        }
      });
  };

  componentDidMount() {
    this.getStatus();
  }

  render() {
    const { status, uploading, fileList } = this.state;
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

    if (status === null) {
      return (
        <div>
          <div>마케터 교육 신청</div>
        </div>
      );
    } else if (status === -1) {
      return (
        <div style={{ textAlign: "center" }}>
          <Icon type="form" style={{ fontSize: 100 }} />
          <div>
            <p>
              마케터 교육 신청을 위해선 증빙 서류가 필요합니다.
              <br />
              증빙 서류를 첨부하여 제출해주세요.
              <br />
              첨부파일은 최대 5개 입니다.
              <br />
              승인까지 약 1~2일이 소요 됩니다.
            </p>
          </div>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 업로드
            </Button>
          </Upload>
          {fileList.length > 5 ? (
            <div style={{ color: "red" }}>파일은 최대 5개입니다!</div>
          ) : null}
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0 || fileList.length > 5}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            제출하기
          </Button>
        </div>
      );
    } else if (Number(status) === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          <Icon type="form" style={{ fontSize: 100 }} />
          <div>
            <p>
              회원님의 정보는 성공적으로 전달 되었으며,
              <br />
              아직 내부 검토 중 입니다.
              <br />
              승인은 1~3일 이내에 완료 예정입니다.
            </p>
          </div>
        </div>
      );
    } else if (Number(status) === 2) {
      return (
        <div style={{ textAlign: "center" }}>
          <Icon type="form" style={{ fontSize: 100 }} />
          <div>
            <p>
              축하합니다!
              <br />
              마케터가 되기 위하여 교육에 성실히 참여해주세요!
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <Icon type="form" style={{ fontSize: 100 }} />
          <div>
            <p>
              회원님께서는 미승인 처리 되었습니다.
              <br />
              조건 및 서류를 다시 검토해주세요.
            </p>
            <p>다시 신청하시겠습니까?</p>
          </div>
          <Button
            type="primary"
            onClick={this.deleteApplies}
            style={{ marginTop: 16 }}
          >
            다시 신청
          </Button>
        </div>
      );
    }
  }
}

export default AddMarketerEdu;
