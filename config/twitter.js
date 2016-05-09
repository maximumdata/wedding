var Twit = require('twit');
var T = new Twit({
  consumer_key: process.env.TWITTERWEDDINGCONSUMERKEY,
  consumer_secret: process.env.TWITTERWEDDINGCONSUMERSECRET,
  access_token: process.env.TWITTERWEDDINGTOKEN,
  access_token_secret: process.env.TWITTERWEDDINGTOKENSECRET
});

module.exports = T;
