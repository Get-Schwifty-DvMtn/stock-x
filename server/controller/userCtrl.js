var app = require('../server.js');
var db = app.get('db');

module.exports = {
    getUserInfo: function(req, res) {
        db.find_By_Id([req.session.passport.user.google_id], function(err, user) {
            if (err) {
                res.status(400).json(err);
            } else {

                res.status(200).json(user[0]);
            }

        });
    }
};
