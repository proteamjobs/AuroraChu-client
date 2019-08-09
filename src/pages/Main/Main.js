import React, { Component } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainMarketersList from "../../components/MainMarketersList";
import "./Main.css";

class Main extends Component {
  render() {
    return (
      <div
        style={{
          height: "100vh",
          flexDirection: "column"
        }}
      >
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <div className="main_banner">
            <p className="main_banner_text">Hello World!</p>
          </div>
          <div>
            <MainMarketersList />
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Main;
