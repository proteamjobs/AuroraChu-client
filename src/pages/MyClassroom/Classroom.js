import React, { Component } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Icon, Progress, Avatar } from "antd";
import "./Classroom.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export class Classroom extends Component {
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <div className="user_info">
              <Avatar size={50} icon="user" />
              <div>캐로로중사</div>
              <Progress percent={50} status="active" />
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    마케팅 이론
                  </span>
                }
              >
                <Menu.Item key="1">마케팅이란</Menu.Item>
                <Menu.Item key="2">마케팅 학개론</Menu.Item>
                <Menu.Item key="3">마케팅의 정석</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    마케팅 실전편
                  </span>
                }
              >
                <Menu.Item key="5">블로그 마케팅이란</Menu.Item>
                <Menu.Item key="6">유의할 점</Menu.Item>
                <Menu.Item key="7">블로그 마케팅 잘하는 법</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Header>title</Header>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Classroom;
