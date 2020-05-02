import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { init } from "./init";
import App from "../imports/ui/App.js";
import { Page as _Page } from "../imports/apis/models/page";

Meteor.startup(() => {
  init();

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("render-target")
  );
});
