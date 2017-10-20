var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

function verify (req, res, next) {
    var token = req.headers['authorization'];
    if(token) {
        token = token.replace(/^Bearer\s/, '');
        jwt.verify(token, 'This is very secret string', function(error, decode) {
            if(error) {
                return next(error);
            } else {
                req.user = decode;
                req.currentUser = decode.userId;
                return next(null, req.currentUser);
            }
        });
    } else {
        var error = new Error('Failed to authenticate');
        return next(error);
    }
};

module.exports.verify = verify;