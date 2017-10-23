var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Note = require('../models/note');
var middleware = require('../middleware');
var router = express.Router();

// base
router.get('/', function (req, res, next) {
    return res.render('index', {
        h1: 'Note Keeper Server',
        h2: 'Authentication is required'
    });
});

// get users (for admin use only)
// admin@admin.com / isAdmin
router.get('/users', middleware.verify, function (req, res, next) {
    if (req.user.userId !== '59e23cb93a71c90a12632213') {
        var error = new Error('User unauthorized. Admin use only.');
        error.status = 401;
        return next(error);
    } else {
        User.find({}).exec(function (error, users) {
            if (error) {
                error.status = 400;
                return next(error);
            } else {
                res.send(users);
            }
        });
    }
});

// login
router.post('/api/login', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {
        User.authenticate(email, password, function (error, user) {
            if (error || !user) {
                var error = new Error('Wrong email or password!');
                error.status = 401;
                return next(error);
            } else {
                // create and send access token
                var token = jwt.sign({ userId: user._id }, 'thisisverysecretstring');
                return res.json({ token });
            }
        });
    } else {
        var error = new Error('Email and/or password were not provided!');
        error.status = 401;
        return next(error);
    }
});

// logout (for sessions)
/*
router.post('/api/logout', function (req, res, next) {
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
*/

// register new user
router.post('/api/register', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    if (email && password) {
        if (password !== confirmPassword) {
            var error = new Error('Password did not match!');
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
                // create and send access token
                var token = jwt.sign({ userId: user._id }, 'thisisverysecretstring');
                return res.json({ token });
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
router.post('/api/add', middleware.verify, function (req, res, next) {
    var currentUser = req.user.userId;

    if (!currentUser) {
        var error = new Error('Unauthorized user.');
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
                    return res.json({ added: true });
                });
            }
            return res.json({ added: true });
        }
    );
});

// GET NOTE BY ID
router.get('/api/notes/:id', function (req, res, next) {
    var currentUser = '59e23e67d525740a2f6b16a1';

    if (!currentUser) {
        var error = new Error('Unauthorized user.');
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
            var note = response[0].notes;
            return res.json(note);
        }
    );
});

// UPDATE NOTE
router.put('/api/update/:id', function (req, res, next) {
    var currentUser = '59e23e67d525740a2f6b16a1';

    if (!currentUser) {
        var error = new Error('Unauthorized user.');
        error.status = 401;
        return next(error);
    }

    // prevent empty notes
    if (!req.body.title || !req.body.description) {
        var error = new Error('Title and description must be filled!');
        return next(error);
    }

    // TO FIX: smarter way to handle updates, allow users to omit title or desc
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
        { new: true },
        function (error) {
            if (error) {
                return next(error);
            }
            return res.json({ updated: true });
        }
    );
});

// REMOVE NOTE
router.delete('/api/delete/:id', middleware.verify, function (req, res, next) {
    var currentUser = req.user.userId;

    if (!currentUser) {
        var error = new Error('Unauthorized user.');
        error.status = 401;
        return next(error);
    }

    Note.findByIdAndUpdate(currentUser,
        { $pull: { notes: { _id: req.params.id } } },
        { new: true },
        function (error) {
            if (error) {
                return next(error);
            }
            return res.json({ deleted: true });
        }
    );
});

// GET ALL NOTES
router.get('/api/notes', function (req, res, next) {
    var currentUser = '59e23e67d525740a2f6b16a1'

    if (!currentUser) {
        var error = new Error('Unauthorized user.');
        error.status = 401;
        return next(error);
    }

    if (req.query['priority'] == 1) {
        Note.findById(currentUser, function (error, response) {
            var data = response.notes.sort();
            return res.json(data);
        });
    } else {
        Note.find({}).exec(function (error, notes) {
            if (error) {
                error.status = 400;
                return next(error);
            } else {
                res.send(notes);
            }
        });
    }
});

// 404
router.get('*', function (req, res, next) {
    var error = new Error('Not found');
    error.status = 404;
    return next(error);
});

module.exports = router;
