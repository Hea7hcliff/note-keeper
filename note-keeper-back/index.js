var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var routes = require('./routes/index');
var app = express();


mongoose.connect("mongodb://localhost:27017/test", {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

var db = mongoose.connection;
// error check
db.on('error', console.error.bind(console, 'Connection error: '));

app.use(bodyParser.json());

app.use('/', routes);

// error handling middleware
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(422).send({ error: err.message });
});

// listen on port 3000
var port = 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
