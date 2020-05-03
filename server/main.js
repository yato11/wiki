import { Meteor } from "meteor/meteor";
import { initData } from "./init";
import { Mongo } from "meteor/mongo";

// const config = require("config");

const databaseConnection = () => {
  // process.env["MONGO_URL"] = "mongodb://localhost:27017/WIKIDB";
};
Meteor.startup(() => {
  // console.log(process.env["MONGO_URL"]);
  // code to run on server at startup
  initData();
  console.warn("Server Started...!");
});
