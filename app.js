require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const {serializeError, deserializeError} = require('serialize-error');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const database = require('./common/database');
const messages = require('./common/messages');
const codes = require('./common/codes');

var app = express();
database.connect()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  next({
    status: 404,
    message: messages.server.ROUTE_NOT_FOUND,
    data: null
  });
});

if (app.get(`env`) === `development`) {
  app.use(function (err, req, res, next) {// eslint-disable-line no-unused-vars
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
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(passport.initialize());
module.exports = app;