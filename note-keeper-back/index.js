var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
// var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);
var app = express();
var routes = require('./routes/index');
var config = require('./config');

// connect to database
mongoose.connect(config.mongo_url, {
    useMongoClient: true
});
// use native promises, this confuses me too
mongoose.Promise = global.Promise;
// connection into variable for easier future reference
var db = mongoose.connection;
// error check
db.on('error', console.error.bind(console, 'Connection error: '));

// MIDDLEWARE ->

// sessions alternative
/*
app.use(session({
    secret: 'this is the most secret string',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// make user ID available
app.use(function (req, res, next) {
    res.locals.currentUser = req.session.userId;
    next();
});
*/

// parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public (CSS, favicon)
app.use(express.static(__dirname + '/public'));
// view engine setup (display html)
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// use routes
app.use('/', routes);

// handle errors
app.use(function(error, req, res, next) {
    console.log(error);
    res.status(error.status || 500).send(error.message);
});

// listen on port 3000
var port = 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
