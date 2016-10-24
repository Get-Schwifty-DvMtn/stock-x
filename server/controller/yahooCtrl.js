var server = require('../server.js');

var today = String(new date(year) + "-" + String(new date(month) + 1) + "-" + new date(day));
//test -
// yahooFinance.historical({
//   symbol: 'AAPL',
//   from: '2016-01-01',
//   to: today,
//   // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
// }, function (err, quotes) {
//   //...
//   console.log(quotes);
// });

angular.module("stock").controller()
