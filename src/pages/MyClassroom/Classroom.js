import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Spin, Progress, Avatar, Button, Radio } from "antd";
import "./Classroom.css";
import axios from "axios";
import ReactPlayer from "react-player";
const { Content, Sider } = Layout;

export class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: null,
      selectedVideo: null,
      percentage: 0
    };
  }

  componentDidMount = () => {
    axios
      .get("http://13.209.78.148:8080/videos", {
        headers: {
          Authorization: `JWT ${this.props.jwt}`
        }
      })
      .then(res => {
        if (res.data.success) {
          console.log(res.data.videos);
          this.setState({
            videos: res.data.videos,
            selectedVideo: res.data.videos[0],
            percentage: res.data.process.percentage
          });
        }
      });
  };

  onSelectLecture = ({ key }) => {
    let video_id = Number(key);
    let selectedVideo = this.state.videos.filter(
      video => video.video_id === video_id
    )[0];

    this.setState({
      selectedVideo: selectedVideo
    });
  };

  onVideoComplete = () => {
    let video_id = this.state.selectedVideo.video_id;
    let jwt = this.props.jwt;

    axios
      .post(`http://13.209.78.148:8080/videos/${video_id}/complete`, null, {
        headers: {
          Authorization: `JWT ${jwt}`
        }
      })
      .then(res => {
        if (res.data.success) {
          axios
            .get("http://13.209.78.148:8080/videos", {
              headers: {
                Authorization: `JWT ${this.props.jwt}`
              }
            })
            .then(res => {
              if (res.data.success) {
                this.setState({
                  videos: res.data.videos,
                  percentage: res.data.process.percentage
                });
              } else {
                alert(res.data.message);
              }
            });
        }
      });
  };

  render() {
    const { videos, selectedVideo, percentage } = this.state;
    return videos ? (
      <Layout className="layout">
        <Sider
          breakpoint="xs"
          width="250"
          collapsedWidth="0"
          className="sider-wrapper"
        >
          <div className="user-wrapper">
            <Avatar className="marinBottom" size={50} icon="user" />
            <div className="marinBottom">캐로로중사</div>
            <Progress percent={percentage} status="active" />
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            onSelect={this.onSelectLecture}
            style={{ height: "100%", borderRight: 0 }}
          >
            {videos.map(video => (
              <Menu.Item key={video.video_id}>
                <span>{video.title}</span>
                <Radio checked={video.isComplete} />
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        {selectedVideo ? (
          <Content className="content-wrapper">
            <h3>{selectedVideo.title}</h3>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url="https://www.youtube.com/watch?v=88EuPFPnFyg"
                width="100%"
                height="100%"
                controls
              />
            </div>
            <h3>내용 설명</h3>
            <br />
            {selectedVideo.description.split("\n").map((line, idx) => (
              <span key={idx}>
                {line}
                <br />
              </span>
            ))}
            <Button
              disabled={selectedVideo.isComplete ? true : false}
              onClick={this.onVideoComplete}
            >
              학습완료
            </Button>
          </Content>
        ) : (
          "강의를 선택해주세요."
        )}
      </Layout>
    ) : (
      <Spin tip="Loading..." />
    );
  }
}

export default Classroom;
