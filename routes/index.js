var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/aaa', function(req, res, next) {
  res.render('error', {message:123,error:{status:123,stack:'asdasdasdads'}});
});
router.get('/users', function(req, res, next) {
  // res.render('error', {message:123,error:{status:123,stack:'asdasdasdads'}});
  res.send('////////////users')
});

module.exports = router;
