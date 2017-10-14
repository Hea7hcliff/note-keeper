var express = require('express');
var User = require('../models');
var router = express.Router();

// base
router.get('/', function (req, res, next) {
    return res.render('index', {
        h1: 'Note Keeper Server',
        h2: 'authentication is required'
    });
});

// get users (for admin use only)
// admin@admin.com / isAdmin
router.get('/users', function(req, res, next) {
    if (req.session.userId !== '59e23cb93a71c90a12632213') {
        return res.render('index', {
            h1: 'Access Denied!',
            h2: 'authorities were notified'
        });
    } else {
        User.find({}).exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                res.send(user);
            }
        });
    }
});

// login
router.post('/login', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {
        User.authenticate(email, password, function(error, user) {
            if (error || !user) {
                var error = new Error('Wrong email or password!');
                error.status = 401;
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.send(req.session.userId);
            }
        });
    } else {
        var error = new Error('Email and/or password were not provided!');
        error.status = 401;
        return next(error);
    }
});

// register new user
router.post('/register', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    if (email && password) {
        if (password !== confirmPassword) {
            var error = new Error('Password mismatch!');
            error.status = 400;
            return next(error);
        }
        var userData = {
            email: email,
            password: password
        };
        User.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                // temporary
                return res.send(req.session.userId);
            }
        });
    } else {
        var error = new Error('Email and/or password were not provided!');
        error.status = 400;
        return next(error);
    }
});

// NOTES ->

module.exports = router;
 