import React, { Component, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Amla from "./views/Amla";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import PrivateRoute from "./config/PrivateRoute";
import { AuthProvider } from "./auth/Auth";
import "../src/assets/css/main.min.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/amla" component={Amla} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
