var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');
var yahooFinance = require('yahoo-finance');
var yahooCtrl = require("./controller/yahooCtrl.js");
var config = require('./config.js');
var passport = require('passport');
var flash = require('connect-flash');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var massiveInstance = massive.connectSync({connectionString: config.connectionString});


var app = module.exports = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

require('./routes.js')(app, passport);

app.use(cors());
app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: "http://localhost:" + config.port + "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));


app.set('view engine', 'ejs');
app.set('db', massiveInstance);

var stockCtrl = require("./controller/stockCtrl.js");


app.get("/getallstocks", stockCtrl.getAllStocks);
app.get("/user/:id/getsavedstocks", stockCtrl.getSavedStocks);
app.get("/testhole", yahooCtrl.getStocks);
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/loginUser' }),
  function(req, res) {
    res.redirect('/');
  });




app.listen(config.port, function(){
  console.log("Yo, it's your port, " + config.port);
});
