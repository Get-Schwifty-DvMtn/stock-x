var app = require('../server.js');
var db = app.get('db');

module.exports = {
  getUserInfo: function(req, res) {
    db.find_By_Id([req.params.id], function(err, user) {
      var userInfo = {
        firstName: user[0].first_name,
        lastName: user[0].last_name,
        pic: user[0].pic_url
      };
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(userInfo);
      }
    });
  }
};
