var server = require('../server.js');

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
