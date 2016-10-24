var server = require('../server.js');
var yahooFinance = require('yahoo-finance');
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var date = today.getDate();

var todayFormatted = year + "-" + (month + 1) + "-" + date;
//test
var SYMBOLS = [
  'AAPL',
  'AMZN',
  'GOOGL',
  'YHOO'
];


module.exports = {
  getStocks: function(req, res) {
    yahooFinance.historical({
      symbols: SYMBOLS,
      from: '2014-10-17',
      to: todayFormatted,
      // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, function (err, quotes) {
      if (err){
        res.status(400).json(err);
      }
      else {
        res.status(200).json(quotes);
      }
    });
  }
};
