const User = require('../models/User');
exports.registerUser = (req, res, next) => {
    User.register(new User({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, (err, user) => {
        if (err) {
            return next(err);
        }
        return res.json({
            user
        })
    });
};