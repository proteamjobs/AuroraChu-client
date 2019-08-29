import React, { Component } from "react";
import { Tabs, Table } from "antd";

const { TabPane } = Tabs;

const columns = [
  {
    title: "상품명",
    dataIndex: "name",
    align: "center",
    render: text => <a>{text}</a>
  },
  {
    title: "마케터",
    className: "marketer",
    dataIndex: "marketer",
    align: "center"
  },
  {
    title: "구매 일시",
    dataIndex: "date",
    align: "center"
  },
  {
    title: "",
    dataIndex: "button",
    align: "center"
  }
];

class OrderList extends Component {
  callback(key) {
    console.log(key);
  }

  render() {
    return (
      <div
        style={{ width: "100%", height: "100%", padding: 30, paddingTop: 10 }}
      >
        <div>구매 정보</div>
        <div style={{ marginBottom: 10 }}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="구매 진행중" key="1">
              <Table columns={columns} bordered />
            </TabPane>
            <TabPane tab="구매 완료" key="2">
              <Table columns={columns} bordered />
            </TabPane>
          </Tabs>
        </div>
        <div>판매 정보</div>
        <div>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="판매 진행중" key="1">
              <Table columns={columns} bordered />
            </TabPane>
            <TabPane tab="판매 완료" key="2">
              <Table columns={columns} bordered />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default OrderList;
