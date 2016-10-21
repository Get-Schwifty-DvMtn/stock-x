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

//test -
yahooFinance.historical({
  symbol: 'AAPL',
  from: '2012-01-01',
  to: '2012-01-04',
  // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
}, function (err, quotes) {
  //...
  console.log(quotes);
});

// API CALLS
// yahooFinance.snapshot({
//   symbol: SYMBOL,
//   fields: FIELDS  // ex: ['s', 'n', 'd1', 'l1', 'y', 'r']
// }, function (err, snapshot) {
//   /*
//   {
//     symbol: 'AAPL',
//     name: 'Apple Inc.',
//     lastTradeDate: '11/15/2013',
//     lastTradePriceOnly: '524.88',
//     dividendYield: '2.23',
//     peRatio: '13.29'
//   }
//   */
// });
//
// yahooFinance.historical({
//   symbol: SYMBOL, // [SYMBOL1, SYMBOL2, etc]
//   from: START_DATE,
//   to: END_DATE
// }, function (err, quotes) {
//   /*
// [
//   {
//     date: Thu Nov 07 2013 00:00:00 GMT-0500 (EST),
//     open: 45.1,
//     high: 50.09,
//     low: 44,
//     close: 44.9,
//     volume: 117701700,
//     adjClose: 44.9,
//     symbol: 'TWTR'
//   },
//   ...
//   {
//     date: Thu Nov 14 2013 00:00:00 GMT-0500 (EST),
//     open: 42.34,
//     high: 45.67,
//     low: 42.24,
//     close: 44.69,
//     volume: 11090800,
//     adjClose: 44.69,
//     symbol: 'TWTR'
//   }
// ]
// */
// });




app.listen(config.port, function() {
  console.log('listening on port', config.port);
});
