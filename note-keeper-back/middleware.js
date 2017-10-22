var jwt = require('jsonwebtoken');

function verify (req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        req.token = token.replace(/^Bearer\s/, '');
        jwt.verify(req.token, 'thisisverysecretstring', function(error, data) {
            req.user = data;
            console.log(req.user);
            if (error) {
                var error = new Error('Failed to authenticate. Invalid token or signature.');
                error.status = 401;
                return next(error);
            }
            return next(null, req.user);
        });
    } else {
        var error = new Error('Failed to authenticate. Access token was not provided.');
        error.status = 401;
        return next(error);
    }
};

module.exports.verify = verify;
