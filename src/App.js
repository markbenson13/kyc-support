import React, { Component, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Amla from "./views/Amla";
import Dashboard from "./views/Dashboard";
import Kyc from "./views/Kyc";
import Accounts from "./views/Accounts";
import Login from "./views/Login";
import Customers from "./views/Customers";
import KycDetails from "./views/KycDetails";
import PrivateRoute from "./config/PrivateRoute";
import { AuthProvider } from "./auth/Auth";
import "../src/assets/css/main.min.css";

// console.log(window.location.pathname);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAmla: false,
    };
  }
  render() {
    const isAmla = this.state.isAmla;

    return (
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
            <PrivateRoute exact path="/kyc" component={Kyc} />
            <PrivateRoute exact path="/amla" component={Amla} />
            <PrivateRoute exact path="/accounts" component={Accounts} />
            <PrivateRoute exact path="/customers" component={Customers} />
            <PrivateRoute path="/user/:id" component={KycDetails} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
