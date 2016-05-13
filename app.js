var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var T = require('./config/twitter');
var Tweet = require('./models/tweets');

var InstagramStream = require('instagram-realtime');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var streamOfTweets = T.stream('statuses/filter', { track: '#RyanAndCait2016'});

streamOfTweets.on('tweet', function(tweet) {
  var mediaArray;
  if(tweet.hasOwnProperty('entities.media')) {
    mediaArray = tweet.entities.media;
  } else { mediaArray = []; }

  var newTweet = Tweet({
    text: tweet.text,
    user: {
      image: tweet.user.profile_image_url,
      name: tweet.user.name,
      handle: tweet.user.screen_name
    },
    media: mediaArray
  });

  newTweet.save(function(err) {
    if(err) { console.log('tweet: ' + tweet); console.log('newTweet: ' + newTweet); console.log('err: '+ err); }
    else {
      console.log('saved tweet: ' + newTweet._id);
    }
  });

});




module.exports = app;
