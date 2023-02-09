var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/services', { title: 'Services' });
});

module.exports = router;
