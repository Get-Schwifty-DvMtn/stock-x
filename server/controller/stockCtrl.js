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
  }

  // db.find_By_Id([req.params.id], function(err, user) {
  //     if (err) {
  //         res.status(400).json(err);
  //     } else if (user[0]) {
  //         var userInfo = {
  //             firstName: user[0].first_name,
  //             lastName: user[0].last_name,
  //             pic: user[0].pic_url
  //         }
  //         res.status(200).json(userInfo);
  //     } else if (user) {
  //         var userInfo = {
  //             firstName: user.first_name,
  //             lastName: user.last_name,
  //             pic: user.pic_url
  //         }
  //         res.status(200).json(userInfo);
  //     };

  // });

};
