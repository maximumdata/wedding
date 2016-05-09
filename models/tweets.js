// grab the things we need
var mongoose = require('../config/database');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

// create a schema
var tweetSchema = new Schema({
  text: String,
  user: {
    image: String,
    name: String,
    handle: String
  },
  media: [
    {
      mediaType: String,
      url: String
    }
  ]
});

tweetSchema.plugin(autoIncrement.plugin, {model: 'Tweet', startAt: 0});

// the schema is useless so far
// we need to create a model using it
var Tweet = mongoose.model('Tweet', tweetSchema);

// make this available to our users in our Node applications
module.exports = Tweet;
