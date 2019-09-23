import React, { Component } from "react";
import { Layout, Menu, Empty, Spin, message, PageHeader } from "antd";
import { withRouter, Link } from "react-router-dom";
import MarketersList from "./MarketersList";
import axios from "axios";
import baseURL from "../../baseURL";
import "antd/dist/antd.css";
import "./Marketers.css";
import categoryList from "../../categoryList";
const { Content, Sider } = Layout;

class Marketers extends Component {
  state = {
    categoryKey: null,
    categoryValue: null,
    marketerList: [],
    totalPage: null
  };

  handleSetCategory = async params => {
    let isCategory = categoryList.filter(data => {
      return data.key === params;
    });

    if (isCategory.length) {
      await this.setState({
        categoryKey: isCategory[0].key,
        categoryValue: isCategory[0].value
      });
    } else {
      await this.setState({
        categoryKey: "전체_업종"
      });
      this.props.history.push("/marketers");
    }
    this.handleGetList(1);
  };
  handleGetList = async page => {
    const category =
      this.state.categoryKey === "전체_업종"
        ? ""
        : "category=" + this.state.categoryKey;
    const pageURL = category === "" ? "page=" + page : "&page=" + page;

    await axios
      .get(`${baseURL}/marketers?${category + pageURL}`)
      .then(result => {
        const { data } = result;

        if (!data.success) {
          this.setState({
            marketerList: [],
            totalPage: null
          });
          message.error("데이터를 가져오지 못했습니다. 다시 시도해주세요.");
        } else {
          this.setState({
            marketerList: data.marketers,
            totalPage: data.totalPage
          });
        }
      });
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
    const { categoryKey, marketerList, totalPage, categoryValue } = this.state;
    const categoryTitle =
      categoryKey === "전체_업종"
        ? (categoryKey + "").replace("_", " ")
        : categoryValue;
    if (categoryKey !== null) {
      return (
        <Layout className="container">
          <div style={{ height: "100%" }}>
            <Sider width={200} className="sider-wrapper">
              <Menu
                mode="inline"
                defaultSelectedKeys={[categoryKey]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="전체_업종">
                  <Link to="/marketers">전체 업종</Link>
                </Menu.Item>

                {categoryList.map(item => {
                  return (
                    <Menu.Item key={item.key}>
                      <Link to={"/marketers/" + item.key}>{item.value}</Link>
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Sider>
          </div>
          <Layout style={{ paddingLeft: "24px", backgroundColor: "#fff" }}>
            <PageHeader title={categoryTitle} style={{ padding: 0 }} />
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 950
              }}
            >
              {!marketerList.length ? (
                <div style={{ marginTop: "300px" }}>
                  <Empty />
                </div>
              ) : (
                <MarketersList
                  marketerList={marketerList}
                  totalPage={totalPage}
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
