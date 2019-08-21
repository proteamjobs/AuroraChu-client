import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Classroom from "./Classroom";
import Store from "../../mobx/signinStore";
import { toJS } from "mobx";
import { observer } from "mobx-react";

@observer
class MyClassroom extends Component {
  render() {
    return toJS(Store.isLogin) ? (
      <>
        <Header history={this.props.history} />
        <Classroom jwt={toJS(Store.jwt)} />
        <Footer />
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default MyClassroom;
