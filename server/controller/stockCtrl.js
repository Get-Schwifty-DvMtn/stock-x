var app = require('../server.js');
var db = app.get('db');

module.exports = {
  getAllStocks: function(req, res) {
    console.log("getAllStocks is working");
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
    db.get_one_stock(req.params.id, function(err, stock){
      if (err){
        res.status(400).json(err);
      }
      else res.status(200).json(stock);
    });
  },

  addNewFavorite: function(req, res) {
    console.log("stockCtrl - req.body", req.body);
    db.add_new_favorite([req.body[0], req.body[1].symbol, req.body[1].name], function (err, stock) {
      console.log("stockCtrl - stock: ", req.body[1]);
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else if (req.body) {
        var newStock = {
          user_google_id: req.body[0],
          company_symbol: req.body[1].symbol,
          company_name: req.body[1].name
        };
        res.status(200).json(newStock);
      }
    });
  },

  removeFavorite: function(req, res) {
    console.log("stockCtrl-rmvFav - req.body", req.body);
    db.remove_favorite([req.body.id, req.body.stock], function (err, stock) {
      console.log("stockCtrl-rmFav - stock: ", req.body.stock);
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else if (req.body) {
        var toDelete = {
          user_google_id: req.body.id,
          company_symbol: req.body.stock,
        };
        res.status(200).json(toDelete);
      }
    });
  },

};
