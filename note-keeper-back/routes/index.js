var express = require('express');
var User = require('../models');
var router = express.Router();

// base
router.get('/', function (req, res, next) {
    return res.send('Server is running...');
});
// get user (and notes)
router.get('/user', function(req, res, next) {
    User.find({}).exec(function(error, user) {
        if (error) {
            return next(error);
        } else {
            res.send(user);
        }
    });
});
// register new user
router.post('/register', function(req, res, next) {
    User.create(req.body).then(function(error, user) {
        if (error) {
            return next(error);
        } else {
            res.send(user);
        }
    })
});

module.exports = router;
 