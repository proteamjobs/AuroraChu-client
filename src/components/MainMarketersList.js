import React, { Component } from "react";
import "./styles.css";

class MainMarketersList extends Component {
  state = {
    marketersList: []
  };

  getMarketerList() {
    fetch("http://13.209.78.148:8080/marketers/latest")
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
        <div className="marketerList">
          {this.state.marketersList.map(item => {
            return (
              <div key={item.marketer_id}>
                <div>
                  <img style={{ width: 30, height: 30 }} src={item.image_url} />
                </div>
                <div>{item.user_name}</div>
                <div>{item.title}</div>
                <div>판매량 : {item.number_of_sales}</div>
              </div>
            );
          })}
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
