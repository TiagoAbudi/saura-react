import React from "react";
import { Router, Switch } from "react-router";
import { history } from "../history";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
import AllowLogin from "./AllowLogin";

// IMPORT DO LOGIN
import Login from "../pages/login/Login";

// IMPORT DA HOME
import Home from "../pages/home/Home";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        {/* ROTA LOGIN */}
        <AllowLogin component={Login} exact path="/login" />

        {/* ROTA HOME */}
        <AllowLogin component={Home} exact path="/" />

        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
