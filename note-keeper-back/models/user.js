var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// AUTHENTICATE
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email })
        .exec(function(error, user) {
            if (error) {
                return callback(error);
            } else if (!user) {
                // internal debugging, message not sent to user
                var error = new Error('User not found!');
                error.status = 401;
                console.log(error);
                return callback(error);
            }
            bcrypt.compare(password, user.password, function(error, result) {
                if (result) {
                    return callback(null, user);
                } else {
                    return callback(error);
                }
            });
        });
}

// ENCRYPT password
UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 11, function(error, hash) {
        if (error) {
            return next(error);
        }
        user.password = hash;
        next();
    });
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
