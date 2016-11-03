var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');
var yahooFinance = require('yahoo-finance');
var yahooCtrl = require("./controller/yahooCtrl.js");
var nytCtrl = require("./controller/nytCtrl.js");
var config = require('./config.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var morgan = require('morgan');

var massiveInstance = massive.connectSync({connectionString: config.connectionString});


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
}, function(accessToken, refreshToken, profile, done) {
    db.find_By_Id([profile.id], function(err, user) {
        if (!user[0]) {
            db.create_user([
                profile.id, profile.name.familyName, profile.name.givenName, profile.photos[0].value + '0',
                accessToken
            ], function(err, user) {
              console.log(user);
                return done(err, user[0]);
            });

        }

        return done(err, user[0]);
    });

}));
passport.serializeUser(function(user, done) {
    // console.log(user + "user")
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    // console.log(id + "id");
    db.find_By_Id([id], function(err, user) {
        done(err, user);
    });
});
var app = module.exports = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(cookieParser());

// require('./routes.js')(app, passport);
app.use(cors());
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24*14 // 14 days
    }
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

// app.set('view engine', 'ejs');
app.set('db', massiveInstance);
var db = app.get('db');
var stockCtrl = require("./controller/stockCtrl.js");
var userCtrl = require("./controller/userCtrl.js");






app.get("/getonestock/:stockId", stockCtrl.getOneStock);
app.get('/getuserinfo', userCtrl.getUserInfo);
app.get("/getallstocks", stockCtrl.getAllStocks);
app.get("/user/:id/getsavedstocks", stockCtrl.getSavedStocks);
app.get("/testhole/:stockId", yahooCtrl.getStocks);
app.post("/snapshots", yahooCtrl.savedStocksSnapshot);
app.post("/addnewfavorite", stockCtrl.addNewFavorite);
app.post("/stocknews", nytCtrl.getNews);
app.delete("/removefavorite/:id/:stock", stockCtrl.removeFavorite);

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/#/'}), function(req, res) {
    res.redirect('/#/user/' + req.user.google_id);
});

app.listen(config.port, function() {
    console.log("Yo, it's your port, " + config.port);
});
