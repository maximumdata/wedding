var express = require('express');
var router = express.Router();
var Tweets = require('../models/tweets');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  Tweets.find({}, function(err, tweets) {
    if(!err) {
      res.json(tweets);
    } else {
      res.send(err);
    }
  });
});

router.get('/test', function(req, res) {
  Tweets.find({}, function(err, tweets) {
    if(err) { res.status(500).json({message: 'something broke'}); }
    else {
      res.render('test', {tweets: tweets});
    }
  });
});

router.get('/cards', function(req, res) {
  res.render('cards');
});

module.exports = router;
