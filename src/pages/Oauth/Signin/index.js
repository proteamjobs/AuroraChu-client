import React, { Component } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SigninForm from "./SigninForm";

class Signin extends Component {
  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <SigninForm history={this.props.history} />
        <Footer />
      </div>
    );
  }
}

export default Signin;
