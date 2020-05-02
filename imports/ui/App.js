import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./home.js";
import "bootstrap/dist/css/bootstrap.css";
import Page from "./components/page/page.jsx";
import Pages from "./components/page/pages.jsx";
import PageForm from "./components/page/pageForm.jsx";
import { NavBar } from "../ui/components/navBar";
import LogIn from "./components/logIn.jsx";
import SignUp from "./components/signUp.jsx";
import { Meteor } from "meteor/meteor";
import Menu from "./components/menu";
import ProtectedLink from "./components/ProtectedLink.jsx";
// App component - represents the whole app
export default App = () => {
  const isLoggingIn = Meteor.loggingIn();
  return (
    <React.Fragment>
      {!isLoggingIn && (
        <Switch>
          <ProtectedLink
            isLogged={!isLoggingIn}
            Component={LogIn}
            path="/login"
          />
          <ProtectedLink
            isLogged={!isLoggingIn}
            Component={SignUp}
            path="/signup"
          />
          {!isLoggingIn && <Redirect to="/login" />}
        </Switch>
      )}
      {isLoggingIn && (
        <>
          <NavBar></NavBar>
          <div className="container-fluid   ">
            <div className="row mx-1">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-3 col-lg-3 d-lg-inline d-xl-inline d-md-inline p-1 d-sm-none  d-none     ">
                    <Menu />
                  </div>
                  <div className="col-md-8 col-lg-9">
                    <main>
                      <Switch>
                        <Route path="/pageForm/:id" component={PageForm} />
                        <Route path="/page/:id" component={Page} />
                        <Route path="/" component={Home} />
                        <Redirect to="/" />
                      </Switch>
                    </main>
                  </div>
                </div>
                <div className="row">
                  {/* footer here  */}
                  <div className="col-md-12"> </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};
