/*
File name: app.js
Course name: COMP229 Web application development
Student Name: Jin Shu
Student ID: 301303882
Date: 2023-02-06
*/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
