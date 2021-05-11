import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/plugins/nucleo/css/nucleo.css";
import "./assets/scss/argon-dashboard-react.scss";

import AuthLayout from "./layouts/Auth.js";

export default class App extends React.Component {

  render() {

  return (
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        </Switch>
      </BrowserRouter>
  );
}
}
