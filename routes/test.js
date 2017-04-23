var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource  --test');
});

router.get('/t1', function(req, res, next) {
  res.render('admin/temp1', { title: 'Express' });
});

router.get('/t2', function(req, res, next) {
  res.render('admin/temp2', {message:123,error:{status:123,stack:'asdasdasdads'}});
});

router.get('/t3', function(req, res, next) {
  // res.render('error', {message:123,error:{status:123,stack:'asdasdasdads'}});
  res.render('admin/temp3', {message:123,error:{status:123,stack:'asdasdasdads'}});
});

router.get('/t4', function(req, res, next) {
  // res.render('error', {message:123,error:{status:123,stack:'asdasdasdads'}});
  res.render('admin/temp4', {message:123,error:{status:123,stack:'asdasdasdads'}});
});

module.exports = router;
