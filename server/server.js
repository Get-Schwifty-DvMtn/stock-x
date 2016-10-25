var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var massive = require('massive');
var yahooFinance = require('yahoo-finance');
var yahooCtrl = require("./controller/yahooCtrl.js");
var config = require('./config.js');

var massiveInstance = massive.connectSync({connectionString: config.connectionString});


var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(cors());
app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true
}));

app.set('db', massiveInstance);
var db = app.get('db');



app.set('db', massiveInstance);
var db = app.get('db');
>>>>>>> master

app.get("/testhole", yahooCtrl.getStocks);

app.listen(config.port, function(){
  console.log("Yo, it's your port, " + config.port);
});
