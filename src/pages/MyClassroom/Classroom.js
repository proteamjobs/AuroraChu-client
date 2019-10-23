import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Spin, Progress, Avatar, Button, Radio } from "antd";
import { withRouter } from "react-router-dom";
import TestSheet from "../../components/TestSheet";
import "./Classroom.css";
import axios from "axios";
import ReactPlayer from "react-player";
import baseURL from "../../baseURL";
const { Content, Sider } = Layout;

export class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldTestContentOn: false,
      videos: null,
      selectedVideo: null,
      percentage: 0
    };
  }

  handleGetVideos = () => {
    axios
      .get(baseURL + "/videos", {
        headers: {
          Authorization: `JWT ${this.props.jwt}`
        }
      })
      .then(res => {
        if (res.data.success) {
          this.setState({
            videos: res.data.videos,
            selectedVideo: res.data.videos[0],
            percentage: res.data.process.percentage
          });
        }
      });
  };

  componentDidMount = () => {
    this.handleGetVideos();
  };

  onClickTestButton = () => {
    let percentage = this.state.percentage;
    if (percentage >= 90) {
      this.setState({
        shouldTestContentOn: true
      });
    } else {
      alert("강의를 90%이상 완료 하셔야 시험 응시가 가능합니다!");
    }
  };

  onSelectLecture = ({ key }) => {
    let video_id = Number(key);
    let selectedVideo = this.state.videos.filter(
      video => video.fk_video_id === video_id
    )[0];

    this.setState({
      shouldTestContentOn: false,
      selectedVideo: selectedVideo
    });
  };

  onVideoComplete = () => {
    let video_id = this.state.selectedVideo.fk_video_id;
    let jwt = this.props.jwt;

    axios
      .post(`${baseURL}/videos/${video_id}/complete`, null, {
        headers: {
          Authorization: `JWT ${jwt}`
        }
      })
      .then(res => {
        if (res.data.success) {
          axios
            .get(baseURL + "/videos", {
              headers: {
                Authorization: `JWT ${this.props.jwt}`
              }
            })
            .then(async res => {
              if (res.data.success) {
                this.setState({
                  videos: res.data.videos,
                  percentage: res.data.process.percentage
                });
                await this.onSelectLecture({ key: video_id });
              } else {
                alert(res.data.message);
              }
            });
        }
      });
  };

  render() {
    const {
      videos,
      selectedVideo,
      percentage,
      shouldTestContentOn
    } = this.state;
    let isFreeUser = this.props.userInfo.status >= 2 ? false : true;
    return videos ? (
      <Layout className="container">
        <Sider
          breakpoint="xs"
          width="250"
          collapsedWidth="0"
          className="sider-wrapper"
        >
          <div className="user-wrapper">
            <Avatar
              size={65}
              className="margin-bottom-small"
              src={this.props.userInfo.profile_url}
            ></Avatar>
            <h3 className="margin-bottom-small">
              {this.props.userInfo.nickname}
            </h3>
            <Progress percent={percentage} status="active" />
          </div>
          <div className="buttons-wrapper">
            <Button
              onClick={this.onClickTestButton}
              className="function-button"
            >
              시험보기
            </Button>
            <Button className="function-button">마케터 신청</Button>
          </div>
          <h3 style={{ padding: "0 0 5px 20px" }}>유료강의</h3>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            onSelect={this.onSelectLecture}
            style={{ borderRight: 0 }}
          >
            {videos.map(video => (
              <Menu.Item key={video.fk_video_id} disabled={isFreeUser}>
                <span className="margin-right-small">{video.title}</span>
                <Radio checked={video.isComplete} />
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        {shouldTestContentOn && (
          <Content className="content-wrapper">
            <TestSheet
              history={this.props.history}
              gobackToVideos={() =>
                this.setState({ shouldTestContentOn: false })
              }
            />
          </Content>
        )}

        {!shouldTestContentOn && selectedVideo && (
          <Content className="content-wrapper">
            <h2 className="margin-bottom-medium">{selectedVideo.title}</h2>
            <div className="player-wrapper margin-bottom-medium">
              <ReactPlayer
                className="react-player"
                url={selectedVideo.src}
                width="100%"
                height="100%"
                controls
              />
            </div>
            <h3 className="margin-bottom-medium">내용 설명</h3>
            <div className="margin-bottom-medium">
              {selectedVideo.description.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
            <Button
              disabled={selectedVideo.isComplete ? true : false}
              onClick={this.onVideoComplete}
              className="complete-video-button"
            >
              학습완료
            </Button>
          </Content>
        )}
      </Layout>
    ) : (
      <Layout className="container">
        <Spin tip="Loading..." className="spin" />
      </Layout>
    );
  }
}

export default withRouter(Classroom);
