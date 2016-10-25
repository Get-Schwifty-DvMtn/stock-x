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

var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var massiveInstance = massive.connectSync({connectionString: config.connectionString});


var app = express();
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




app.set('view engine', 'ejs');
app.set('db', massiveInstance);
var db = app.get('db');

// var stockCtrl = require("./controller/stockCtrl.js");


// app.get("/getallstocks", stockCtrl.getAllStocks);
//app.get("/user/:id/getsavedstocks", stockCtrl.getSavedStocks);
app.get("/testhole", yahooCtrl.getStocks);

app.listen(config.port, function(){
  console.log("Yo, it's your port, " + config.port);
});
