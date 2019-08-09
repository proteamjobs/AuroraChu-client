import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Signin from "./pages/Oauth/Signin/Signin";
import Signup from "./pages/Oauth/Signup/Signup";
import NotMatch from "./pages/NotMatch/NotMatch";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route component={NotMatch} />
      </Switch>
    </Router>
  );
}

export default App;
