import React, { Component } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainMarketersList from "../../components/MainMarketersList";
import "./Main.css";

import Store from "../../mobx/signinStore";
import { observer } from "mobx-react";

@observer
class Main extends Component {
  render() {
    return (
      <>
        <Header history={this.props.history} />
        <div className="main">
          <div className="main_banner">
            <p className="main_banner_text">Hello World!</p>
          </div>
          <div>
            <MainMarketersList />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Main;
