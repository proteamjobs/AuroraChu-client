import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Classroom from "./Classroom";
import { observer } from "mobx-react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import Store from "../../mobx/signinStore";
// import { toJS } from "mobx";
// import baseURL from "../../baseURL";

@observer
class MyClassroom extends Component {
  render() {
    // return toJS(Store.isLogin) ? (
    return true ? (
      <>
        {/* <Header history={this.props.history} /> */}
        {/* <Classroom jwt={toJS(Store.jwt)} /> */}
        <Classroom jwt={sessionStorage.getItem("token")} />
        {/* <Footer /> */}
      </>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default MyClassroom;
