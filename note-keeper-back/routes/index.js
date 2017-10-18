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
        User.find({}).exec(function (error, users) {
            if (error) {
                return next(error);
            } else {
                res.send(users);
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
                // temp
                // todo access tokens
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
                // temp
                // todo access tokens
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

// ADD NEW
router.post('/add', function (req, res, next) {
    var currentUser = req.session.userId;

    if (!currentUser) {
        var error = new Error('Unauthorized!');
        error.status = 401;
        return next(error);
    }

    // prevent empty notes
    if (!req.body.title && !req.body.description) {
        var error = new Error('Title or description must be filled!');
        return next(error);
    }

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
    var userData = {
        _id: currentUser,
        notes: [note]
    }

    // push new note object
    Note.findByIdAndUpdate(currentUser,
        { $push: { notes: note } },
        { new: true, upsert: true },
        function (error, response) {
            if (error) {
                return next(error);
            } else if (!currentUser) {
                // create new user object if does not exist
                Note.create(userData, function (error, response) {
                    if (error) {
                        return next(error);
                    }
                    // temp
                    return res.send(response);
                });
            }
            // temp
            return res.send(response);
        }
    );
});

// GET NOTE BY ID
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
        function (error, response) {
            if (error) {
                return next(error);
            }
            const note = response[0].notes;
            return res.send(note);
        }
    );
});

// UPDATE NOTE
router.put('/update/:id', function (req, res, next) {
    var currentUser = req.session.userId;

    if (!currentUser) {
        var error = new Error('Unauthorized!');
        error.status = 401;
        return next(error);
    }

    // prevent empty notes
    if (!req.body.title && !req.body.description) {
        var error = new Error('Title or description must be filled!');
        return next(error);
    }

    var updated = {
        'notes.$.title': req.body.title,
        'notes.$.description': req.body.description,
        'notes.$.priority': req.body.priority,
        'notes.$.done': req.body.done,
        'notes.$.modifiedDate': new Date().toISOString()
    }

    Note.update(
        { _id: currentUser, 'notes._id': req.params.id },
        {
            '$set': updated
        },
        function (error) {
            if (error) {
                return next(error);
            }
            return res.send({ updated: true });
        }
    );
});

// REMOVE NOTE
router.delete('/delete/:id', function (req, res, next) {
    var currentUser = req.session.userId;

    if (!currentUser) {
        var error = new Error('Unauthorized!');
        error.status = 401;
        return next(error);
    }

    Note.findByIdAndUpdate(currentUser, 
        { $pull: { notes: { _id: req.params.id }}}, 
        {new: true}, 
        function (error, data) {
            if (error) {
                return next(error);
            }
            // temp
            return res.send(data);
        }
    );
});

// GET ALL NOTES
router.get('/notes', function(req, res, next) {
    var currentUser = req.session.userId;

    if (!currentUser) {
        var error = new Error('Unauthorized!');
        error.status = 401;
        return next(error);
    }

    if (req.query['priority'] == 1) {
        Note.findById(currentUser, function(error, response) {
            var data = response.notes.sort();
            return res.send(data);
        });
    } else {
        Note.findById(currentUser, function(error, response) {
            if (error) {
                return next(error);
            }
            return res.send(response.notes);
        });
    }
});

module.exports = router;
