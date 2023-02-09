/*
File name: app.js
Course name: COMP229 Web application development
Student Name: Jin Shu
Student ID: 301303882
Date: 2023-02-06
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' , page: "home"});
});

router.get("/home", function (req, res, next) {
  res.render("index", { title: "Home", page: "home" });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About', page: "about" });
});
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects', page: "projects" });
});
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact', page: "contact" });
});
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services', page: "services" });
});

module.exports = router;
