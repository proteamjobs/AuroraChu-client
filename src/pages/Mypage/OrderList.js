import React, { Component } from "react";
import { Tabs, Table, Icon, Spin, Button } from "antd";
import baseURL from "../../baseURL";

const { TabPane } = Tabs;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const columns = [
  {
    title: "주문 번호",
    dataIndex: "id",
    align: "center",
    width: "15%"
  },
  {
    title: "상품명",
    dataIndex: "name",
    align: "center",
    width: "30%",
    render: text => <p>{text}</p>
  },
  {
    title: "마케터",
    className: "marketer",
    dataIndex: "marketer",
    align: "center",
    width: "20%"
  },
  {
    title: "구매 일시",
    dataIndex: "date",
    align: "center",
    width: "20%"
  },
  {
    title: "비고",
    dataIndex: "button",
    align: "center",
    width: "15%",
    render: () => (
      <div>
        <Button style={{ backgroundColor: "#C4C4C4", marginBottom: 10 }}>
          구매확정
        </Button>
        <Button style={{ backgroundColor: "#C4C4C4" }}>취소하기</Button>
      </div>
    )
  }
];

const columns2 = [
  {
    title: "주문 번호",
    dataIndex: "id",
    align: "center",
    width: "15%"
  },
  {
    title: "구매자",
    dataIndex: "name",
    align: "center",
    width: "30%",
    render: text => <p>{text}</p>
  },
  {
    title: "개수",
    dataIndex: "count",
    align: "center",
    width: "20%"
  },
  {
    title: "판매 일시",
    dataIndex: "date",
    align: "center",
    width: "20%"
  },
  {
    title: "비고",
    dataIndex: "button",
    align: "center",
    width: "15%",
    render: () => (
      <div>
        <Button style={{ backgroundColor: "#C4C4C4", marginBottom: 10 }}>
          납품완료
        </Button>
        <Button style={{ backgroundColor: "#C4C4C4" }}>취소하기</Button>
      </div>
    )
  }
];

class OrderList extends Component {
  state = {
    purchaseList: [],
    purchaseSuccessList: [],
    saleList: [],
    slaeSuccessList: []
  };

  callback(key) {
    // console.log(key);
  }

  getOrders = async () => {
    const token = await sessionStorage.getItem("token");

    fetch(`${baseURL}/businesses`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.editData(json.purchaseList, json.saleList);
        }
      });
  };

  editData = (purchaseList, saleList) => {
    let purchaseArr = [];
    let purchaseSuccessArr = [];
    let saleArr = [];
    let saleSuccessArr = [];

    purchaseList.map(item => {
      let temp = {
        id: item.purchaseId,
        name: item.marketerTitle,
        marketer: item.marketerNickname,
        date: item.purchasDate
          .slice(0, item.purchasDate.indexOf("T"))
          .replace(/-/g, ".")
      };
      if (item.status === 2) {
        purchaseSuccessArr.push(temp);
        this.setState({
          purchaseSuccessList: purchaseSuccessArr
        });
      } else {
        purchaseArr.push(temp);
        this.setState({
          purchaseList: purchaseArr
        });
      }
      return true;
    });

    saleList.map(item => {
      let temp = {
        id: item.buyerId,
        name: item.buyerNickname,
        count: item.purchaseCount,
        date: item.saleDate
          .slice(0, item.saleDate.indexOf("T"))
          .replace(/-/g, ".")
      };
      if (item.status === 2) {
        saleSuccessArr.push(temp);
        this.setState({
          saleSuccessList: saleSuccessArr
        });
      } else {
        saleArr.push(temp);
        this.setState({
          saleList: saleArr
        });
      }
      return true;
    });
  };

  componentDidMount() {
    this.getOrders();
  }

  render() {
    const {
      purchaseList,
      saleList,
      purchaseSuccessList,
      saleSuccessList
    } = this.state;

    if (purchaseList && saleList) {
      return (
        <div
          style={{ width: "100%", height: "100%", padding: 30, paddingTop: 10 }}
        >
          <div>구매 정보</div>
          <div style={{ marginBottom: 10 }}>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="구매 진행중" key="1">
                <Table columns={columns} bordered dataSource={purchaseList} />
              </TabPane>
              <TabPane tab="구매 완료" key="2">
                <Table
                  columns={columns}
                  bordered
                  dataSource={purchaseSuccessList}
                />
              </TabPane>
            </Tabs>
          </div>
          <div>판매 정보</div>
          <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="판매 진행중" key="1">
                <Table columns={columns2} bordered dataSource={saleList} />
              </TabPane>
              <TabPane tab="판매 완료" key="2">
                <Table
                  columns={columns2}
                  bordered
                  dataSource={saleSuccessList}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      );
    } else {
      return <Spin indicator={antIcon} />;
    }
  }
}

export default OrderList;
