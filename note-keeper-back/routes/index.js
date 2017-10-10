var express = require('express');
var Note = require('../models');
var router = express.Router();

router.get('/', function (req, res, next) {
    return res.send('Hello backend');
});

router.get('/notes', function(req, res, next) {
    Note.find({}).exec(function(err, notes) {
        if (err) return next(err);
        else res.send(notes);
    });
});

router.post('/add', function (req, res, next) {
    Note.create(req.body).then(function(note){
        res.send(note);
    }).catch(next);    
});

module.exports = router;
 