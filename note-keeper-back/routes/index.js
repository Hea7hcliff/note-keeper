var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
var Note = require('../models/note');
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
router.get('/users', function (req, res, next) {
    if (req.session.userId !== '59e23cb93a71c90a12632213') {
        return res.render('index', {
            h1: 'Access Denied!',
            h2: 'authorities were notified'
        });
    } else {
        User.find({}).exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                res.send(user);
            }
        });
    }
});

// login
router.post('/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {
        User.authenticate(email, password, function (error, user) {
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

// logout
router.post('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (error) {
            if (error) {
                return next(error);
            } else {
                return res.send({ logout: true });
            }
        });
    }
});

// register new user
router.post('/register', function (req, res, next) {
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
        User.create(userData, function (error, user) {
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

// add new
router.post('/add', function (req, res, next) {
    var currentUser = req.session.userId;
    // defining note object to insert
    var note = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority
    };
    /*
        create user instance to insert into notes collection 
        if no user _id yet exist (first insert)
    */
    var data = {
        _id: currentUser,
        notes: [note]
    }

    if (!currentUser) {
        var error = new Error('Unauthorized!');
        error.status = 401;
        return next(error);
    }

    // push new note object
    Note.findByIdAndUpdate(currentUser,
        { $push: { notes: note } },
        { new: true, upsert: true },
        function (error, notes) {
            if (error) {
                return next(error);
            } else if (!currentUser) {
                // create new user object if does not exist
                Note.create(data, function (error, notes) {
                    if (error) {
                        return next(error);
                    }
                    return res.send(notes);
                });
            }
            return res.send(notes);
        }
    );
});

// get note by id
router.get('/notes/:id', function (req, res, next) {
    var currentUser = req.session.userId;

    if (!currentUser) {
        var error = new Error('Unauthorized!');
        error.status = 401;
        return next(error);
    }

    Note.find(
        { _id: currentUser, "notes._id": req.params.id },
        { 'notes.$': 1 },
        function (error, data) {
            if (error) {
                return next(error);
            }
            const response = data[0].notes;
            return res.send(response);
        }
    );
});

// update one
router.put('/update/:id', function (req, res, next) {
    var currentUser = req.session.userId;

    if (!currentUser) {
        var error = new Error('Unauthorized!');
        error.status = 401;
        return next(error);
    }

    var updated = {
        'notes.$.title': req.body.title,
        'notes.$.description': req.body.description,
        'notes.$.priority': req.body.priority,
        'notes.$.done': req.body.done
    }

    Note.update(
        { _id: currentUser, 'notes._id': req.params.id },
        {
            '$set': updated
        },
        function (error, data) {
            if (error) {
                return next(error);
            }
            return res.send({ updated: true });
        }
    );
});

module.exports = router;
