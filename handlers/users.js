const User = require('../models/User');

const messages = require('../common/messages');
const auth = require('../common/auth');

const passport = require('passport');
const { token } = require('morgan');

exports.register = (req, res, next) => {
  User.register(new User({
    username: req.body.username,
    email: req.body.email
  }), req.body.password, (err, user) => {
    if (err) {
      return next(err);
    }
    auth.getLoginData(user)
      .then(data => {
        return res.json({
          success: 'success',
          data
        })
      })
      .catch(err => {
        console.log('Helllo')
        return next({ message: messages.server.DB_ERROR, data: err })
      });
  });
};
exports.login = (req, res, next) => {
  passport.authenticate(`local`, (err, user, info) => {
    if (err) {
      return next({ message: messages.server.DB_ERROR });
    }
    if (info) {
      return next({ message: info.message });
    }
    if (!user) {
      return next({ message: messages.user.NO_USER });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next({ message: messages.server.DB_ERROR });
      }
      auth.getLoginData(user)
        .then(data => {
          return res.json({
            success: 'success',
            data
          })
        })
        .catch(err => {
          return next({ message: messages.server.DB_ERROR, data: err })
        });
    });
  })(req, res, next);
}