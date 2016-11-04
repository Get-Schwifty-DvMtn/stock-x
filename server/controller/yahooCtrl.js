var server = require('../server.js');
var yahooFinance = require('yahoo-finance');
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
var date = today.getDate();

var todayFormatted = year + "-" + (month + 1) + "-" + date;
//test

module.exports = {
    getStocks: function(req, res) {
        var dateObj = {
            start: req.params.start,
            end: req.params.end
        };
        var stock;
        if (req.params.stockId != 'undefined') {
            stock = req.params.stockId; //this will be a variable for the selected stock
        } else {
            stock = 'GOOG';
        }
        yahooFinance.historical({
            symbol: stock, from: dateObj.start, to: dateObj.end,
            // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
        }, function(err, quotes) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(quotes);
            }
        });
    },

    savedStocksSnapshot: function(req, res) {
        yahooFinance.snapshot({
            symbols: req.body.symbols,
            fields: [
                's',
                'n',
                'a',
                'c1',
                'p2',
                'w1'
            ]
        }, function(err, snapshot) {
            if (err) {
                res.status(400).json(err);
            } else
                res.status(200).json(snapshot);
            }
        );
    }
};
