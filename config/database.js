var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/weddingtest');

module.exports = mongoose;
