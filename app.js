require('dotenv').config();
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { serializeError } = require('serialize-error');

const User = require('./models/User');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

const database = require('./common/database');
const messages = require('./common/messages');
const codes = require('./common/codes');

let app = express();
database.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  next({
    status: 404,
    message: messages.server.ROUTE_NOT_FOUND,
    data: null
  });
});

if (app.get(`env`) === `development`) {
  app.use(function (err, req, res, next) {// eslint-disable-line no-unused-vars
    // eslint-disable-next-line no-console
    console.log(`##API--ERR`);
    // log(err);
    res.status(err.status || codes.SERVER_ERROR);
    res.json({
      message: err.message,
      data: err instanceof Error ? serializeError(err) : err,
      success: false
    });
  });
}

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
