var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var routes = require('./routes/index');
var config = require('./config');
var app = express();

// connect to database
mongoose.connect("mongodb://localhost:27017/notekeeper", {
    useMongoClient: true
});
// use native promises, this confuses me too
mongoose.Promise = global.Promise;
// connection into variable for easier future reference
var db = mongoose.connection;
// error check
db.on('error', console.error.bind(console, 'Connection error: '));

// MIDDLEWARE
// parse incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// use routes
app.use('/', routes);
// handle some errors
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.send({ message: err.message, err });
});

// listen on port 3000
var port = 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
