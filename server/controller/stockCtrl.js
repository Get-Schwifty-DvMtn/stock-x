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
    db.get_saved_stocks(req.params.id, function(err, stocks) {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(stocks);
      }
    });
  },

  getOneStock: function(req, res){
    var symbol;
    if (req.params.stockId !== "undefined"){
      symbol = req.params.stockId;
    }
    else {
      symbol = "GOOG";
    }
    db.get_one_stock(symbol, function(err, stock){
      if (err){
        res.status(400).json(err);
      }
      else res.status(200).json(stock);
    });
  },

  addNewFavorite: function(req, res) {
    console.log(req.body);
    db.add_new_favorite([req.body[0], req.body[1].symbol], function (err, stock) {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else if (req.body) {
        var newStock = {
          user_google_id: req.body[0],
          company_symbol: req.body[1].symbol,
          // company_name: req.body[1].name
        };
        res.status(200).json(newStock);
      }
    });
  },

  removeFavorite: function(req, res) {
    console.log('req.params in stockCtrl', req.params);
    
    db.remove_favorite([req.params.stock_id], function (err, stock) {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else {
        var id = req.params.stock_id;
        res.status(200).json(id);
      }
    });
  },

};
