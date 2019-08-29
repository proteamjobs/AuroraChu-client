import React, { Component } from "react";
// import Header from "../../../components/Header";
// import Footer from "../../../components/Footer";
import SigninForm from "./SigninForm";
import { withRouter } from "react-router-dom";

class Signin extends Component {
  render() {
    return (
      <div>
        {/* <Header history={this.props.history} /> */}
        <SigninForm
          history={this.props.history}
          getUserData={this.props.getUserData}
        />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withRouter(Signin);
