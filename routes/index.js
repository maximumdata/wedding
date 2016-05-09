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

router.get('/add', function(req, res) {
  var newTweet = Tweets({
    text: 'sample text content',
    user: {
      image: 'sample image url',
      name: 'sample name'
    },
    media: [
      {
        mediaType: 'photo',
        url: 'sample photo url #1'
      },
      {
        mediaType: 'video',
        url: 'sample video url #2'
      }
    ],
    hashtags: ['ohboy', 'what']
  });

  newTweet.save(function(err) {
    if(err) { throw err; }
    else {
      console.log('saved!');
      res.send('saved');
    }
  });


});

module.exports = router;
