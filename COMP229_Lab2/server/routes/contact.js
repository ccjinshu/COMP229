/**
 File name: app.js
 Course name: COMP229 Web application development
 Assignment: 2#
 Student Name: Jin Shu
 Student ID: 301303882
 Date: 2023-02-26
 **/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require("passport");

// connect to our Contact Model
//let Contact = require("../models/contact");

let contactController = require("../controllers/contact");

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* GET Route for the Contact List page - READ Operation */
router.get("/", contactController.displayContactList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", requireAuth, contactController.addPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", requireAuth, contactController.addProcessPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", requireAuth, contactController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post("/edit/:id", requireAuth, contactController.processingEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", requireAuth, contactController.deletePage);

module.exports = router;
