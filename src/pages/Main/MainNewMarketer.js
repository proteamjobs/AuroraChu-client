import React, { Component } from "react";
import baseURL from "../../baseURL";
import { Card, Rate, List } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./Main.css";

class MainNewMarketer extends Component {
  state = {
    marketersList: []
  };

  getMarketerList() {
    fetch(baseURL + "/marketers/latest")
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            marketersList: json.marketers,
            loading: false
          });
        }
      });
  }

  componentDidMount() {
    this.getMarketerList();
  }

  render() {
    let { marketersList } = this.state;
    if (marketersList.length !== 0) {
      return (
        <div style={{ padding: "10px" }}>
          <List
            grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 6, xl: 6 }}
            dataSource={marketersList}
            renderItem={item => {
              return (
                <List.Item>
                  <Link to={"/marketers/@" + item.marketer_info.nickname}>
                    <Card
                      bodyStyle={{ padding: "8px" }}
                      hoverable
                      style={{ width: "170px", height: "270px" }}
                      cover={
                        <div>
                          <img
                            alt=""
                            src={item.post.image_url}
                            width="100%"
                            height="120px"
                          />
                        </div>
                      }
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                          textAlign: "right"
                        }}
                      >
                        {item.marketer_info.nickname}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8125rem",
                          height: "55px",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                          marginTop: "5px"
                        }}
                      >
                        {item.post.title}
                      </div>
                      <div style={{ fontSize: "0.8125rem", marginTop: "10px" }}>
                        판매량 : {item.marketer_info.number_of_sales}
                      </div>
                      <Rate
                        allowHalf
                        disabled
                        value={item.marketer_info.avg_star}
                        style={{ fontSize: "14px" }}
                      />
                      <span style={{ fontSize: "0.75rem" }}>
                        ({item.marketer_info.review_count})
                      </span>
                    </Card>
                  </Link>
                </List.Item>
              );
            }}
          />
        </div>
      );
    } else {
      return (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 5 }}
          dataSource={marketersList}
          renderItem={() => {
            return (
              <List.Item>
                <Card
                  bodyStyle={{ padding: "8px" }}
                  hoverable
                  style={{ width: 170, height: 270 }}
                  loading={true}
                ></Card>
              </List.Item>
            );
          }}
        />
      );
    }
  }
}

export default MainNewMarketer;
