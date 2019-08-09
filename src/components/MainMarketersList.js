import React, { Component } from "react";

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
        <div>
          <div>MainMarketersList Page</div>
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
