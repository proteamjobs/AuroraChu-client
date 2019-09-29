import React, { Component } from "react";
import { Pagination, Card, List, Rate } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./Marketers.css";

class MarketersList extends Component {
  render() {
    return (
      <>
        <div style={{ height: "860px" }}>
          <List
            grid={{ gutter: 16, xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}
            dataSource={this.props.marketerList}
            renderItem={item => {
              return (
                <List.Item>
                  <Link to={"/marketer/@" + item.marketer_info.nickname}>
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

        <Pagination
          defaultPageSize={12}
          total={this.props.totalPage}
          style={{ textAlign: "center" }}
          onChange={this.props.handleGetList}
        />
      </>
    );
  }
}

export default MarketersList;
