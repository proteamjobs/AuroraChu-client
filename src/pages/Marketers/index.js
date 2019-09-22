import React, { Component } from "react";
import { Layout, Menu, Empty, Spin, message } from "antd";
import { withRouter, Link } from "react-router-dom";
import MarketersList from "./MarketersList";
import axios from "axios";
import baseURL from "../../baseURL";
import "antd/dist/antd.css";
import "./Marketers.css";
let categoryList = [
  "홍보_마케팅",
  "자영업_수산"
  //   { key: "전체_업종", category: "전체 업종" },
  //   { key: "홍보_마케팅", category: "홍보/마케팅" },
  //   { key: "자영업_수산", category: "자영업/수산" }
];
const { Content, Sider } = Layout;

class Marketers extends Component {
  state = {
    categoryKey: null,
    marketerList: [],
    totalPage: null
  };

  handleSetCategory = async params => {
    let isCategory = categoryList.filter(data => {
      return data === params;
    });

    if (isCategory.length) {
      await this.setState({
        categoryKey: isCategory[0]
      });
    } else {
      await this.setState({
        categoryKey: "전체_업종"
      });
      this.props.history.push("/marketers");
    }

    this.handleGetList(1);

    // console.log("A:", this.state.categoryKey, " B:", this.state.marketerList);
  };
  handleGetList = async page => {
    const category =
      this.state.categoryKey === "전체_업종"
        ? ""
        : "category=" + this.state.categoryKey;
    const pageURL = category === "" ? "page=" + page : "&page=" + page;

    console.log(`${baseURL}/marketers?${category + pageURL}`);
    await axios
      .get(`${baseURL}/marketers?${category + pageURL}`)
      .then(result => {
        console.log("GetList :: ", result.data);
        if (!result.data.success) {
          this.setState({
            marketerList: []
          });
          message.error("데이터를 가져오지 못했습니다. 다시 시도해주세요.");
        } else {
          this.setState({
            marketerList: result.data.marketers,
            totalPage: result.data.totalPage
          });
        }
      });

    console.log(
      "A:",
      this.state.categoryKey,
      " B:",
      this.state.marketerList,
      " C:",
      this.state.totalPage
    );
  };

  componentDidMount = () => {
    if (this.props.match.params.category) {
      this.handleSetCategory(this.props.match.params.category);
    } else {
      this.handleSetCategory("전체_업종");
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this.handleSetCategory(this.props.match.params.category);
    }
  };
  render() {
    if (this.state.categoryKey !== null) {
      return (
        <Layout className="container">
          <div style={{ height: "100%" }}>
            {/* 카테고리 */}
            <Sider width={200} className="sider-wrapper">
              <Menu
                mode="inline"
                defaultSelectedKeys={[this.state.categoryKey]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="전체_업종">
                  <Link to="/marketers">전체 업종</Link>
                </Menu.Item>

                {categoryList.map(item => {
                  return (
                    <Menu.Item key={item}>
                      <Link to={"/marketers/" + item}>{item}</Link>
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Sider>
          </div>
          <Layout style={{ paddingLeft: "24px", backgroundColor: "#fff" }}>
            {this.state.categoryKey}
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 950
                // border: "1px solid #e8e8e8"
              }}
            >
              {!this.state.marketerList.length ? (
                <div style={{ marginTop: "300px" }}>
                  <Empty />
                </div>
              ) : (
                <MarketersList
                  marketerList={this.state.marketerList}
                  totalPage={this.state.totalPage}
                  handleGetList={this.handleGetList}
                />
              )}
            </Content>
          </Layout>
        </Layout>
      );
    } else {
      return <Spin />;
    }
  }
}

export default withRouter(Marketers);
