import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Signin from "./pages/Oauth/Signin";
import Signup from "./pages/Oauth/Signup";
import NotMatch from "./pages/NotMatch";
import MyClassroom from "./pages/MyClassroom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/myclassroom" component={MyClassroom} />

        <Route component={NotMatch} />
      </Switch>
    </Router>
  );
}

export default App;
