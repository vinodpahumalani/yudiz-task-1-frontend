import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Component/Signin";
import RegisterPage from "./Component/RegisterPage";
import Dashboard from "./Component/Dashboard";


import { createBrowserHistory } from "history";
import NotFound from "./NotFound";
export class RouteContainer extends Component {
  render() {
    return (
      <div>
        <Router history={createBrowserHistory}>
          <Switch>
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/signin" component={Signup} />
            <Route  path="/*" component={NotFound} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default RouteContainer;
