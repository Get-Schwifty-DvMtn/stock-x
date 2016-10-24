var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');
var yahooFinance = require('yahoo-finance');

// config.port, config.secret, config.nytAPI
var config = require('./config.js');


var app = express();

app.use(bodyParser.json());

app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true
}));








app.listen(config.port, function() {
  console.log('listening on port', config.port);
});
