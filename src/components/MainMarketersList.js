import React, { Component } from "react";
import ReactStars from "react-stars";
import "./styles.css";
import baseURL from "../baseURL";

class MainMarketersList extends Component {
  state = {
    marketersList: []
  };

  getMarketerList() {
    fetch(baseURL + "/marketers/latest")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          marketersList: json.data
        });
        console.log(this.state);
      });
  }

  componentDidMount() {
    this.getMarketerList();
  }
  render() {
    if (this.state.marketersList.length !== 0) {
      return (
        <div>
          <p style={{ textAlign: "left" }}>최근 등록된 마케터</p>
          <div className="marketerList">
            {this.state.marketersList.map(item => {
              return (
                <div className="listItem" key={item.marketer_id}>
                  <div>
                    <img
                      style={{ width: "100%", height: 100 }}
                      src={item.image_url}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      textAlign: "right",
                      fontSize: 10,
                      padding: 5
                    }}
                  >
                    {item.user_name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: 5
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        fontSize: 12,
                        height: "100%",
                        paddingTop: 10
                      }}
                    >
                      {item.title}
                    </div>
                    <div>
                      <div style={{ textAlign: "left", fontSize: 12 }}>
                        판매량 : {item.number_of_sales}
                      </div>
                      <ReactStars
                        count={5}
                        value={item.avg_star}
                        edit={false}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>Loading...</div>
        </div>
      );
    }
  }
}

export default MainMarketersList;
