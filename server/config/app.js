// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//module for authentification
let session=require('express-session');
let passport=require('passport');
let passportLocal=require('passport-local');
let localStrategy=passportLocal.Strategy;
let flash=require('connect-flash');



//database setup

let mongoose = require('mongoose');
let DB = require('./db');

//connect with database
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
//error check
mongoDB.on('error', console.error.bind(console,'Error in Connection'));
mongoDB.once('open', ()=> {
console.log('Connected with your Databases');
});
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactRouter = require('../routes/contactlist');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express  -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));
//set up express session
app.use(session({

  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));
//initial flash

app.use(flash());

//initialize passport

app.use(passport.initialize());
app.use(passport.session());

//crate a user model

let userModel=require('../models/user');
let User=userModel.User;

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contactlist', contactRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});

module.exports = app;
