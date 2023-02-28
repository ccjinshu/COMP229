/**
 File name: app.js
 Course name: COMP229 Web application development
 Assignment: 2#
 Student Name: Jin Shu
 Student ID: 301303882
 Date: 2023-02-26
 **/
let express = require("express"); //require express
let router = express.Router();  //create an instance of express router
let mongoose = require("mongoose"); //require mongoose

//create a model class for contacts
let contactModel = mongoose.Schema(
  {
    name: String,
    number: String,
    email: String,
  },

  {
    collection: "contacts",
  }
);

//export the model
module.exports = mongoose.model("Contact", contactModel);
