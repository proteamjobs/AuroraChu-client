import React, { Component } from "react";
import SigninForm from "./SigninForm";
import { withRouter } from "react-router-dom";

class Signin extends Component {
  render() {
    return (
        <SigninForm
          history={this.props.history}
          getUserData={this.props.getUserData}
        />
    );
  }
}

export default withRouter(Signin);
