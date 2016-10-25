var app = require('../server.js');
var db = app.get('db');

module.exports = {
  getAllStocks: function(req, res) {
    db.get_all_stocks(function(err, stocks) {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(stocks);
      }
    });
  },

  getSavedStocks: function(req, res) {
    db.get_saved_stocks([req.params.id], function(err, stocks) {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(stocks);
      }
    });
  },

};
