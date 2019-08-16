import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Classroom from "./Classroom";

function MyClassroom({ history }) {
  return (
    <>
      <Header history={history} />
      <Classroom />
      <Footer />
    </>
  );
}

export default MyClassroom;
