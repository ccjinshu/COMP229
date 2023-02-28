/*
File name: app.js
Course name: COMP229 Web application development
Student Name: Jin Shu
Student ID: 301303882
Date: 2023-02-25
*/

// installed 3rd party packages
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

//modules for authentication
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStratergy = passportLocal.Strategy;
let flash = require("connect-flash");

//mongoDB driver
let mongoose = require("mongoose");
let DB = require("./db");

//db config
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });


let mongodb = mongoose.connection;
mongodb.on("error", console.error.bind(console, "connection error:"));

mongodb.once("open", () => {
  console.log("Database Connected");
}); //connected to the database

let indexRouter = require("../routes/index");
let usersRouter = require("../routes/users");
let contactsRouter = require("../routes/contact");
let booksRouter = require('../routes/book');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));






//setup express session
app.use(
    session({
      secret: "SomeSecret",
      saveUninitialized: false,
      resave: false,
    })
);


//initialize flash
app.use(flash());

//intialize passport
app.use(passport.initialize());
app.use(passport.session());


//passport user Configuration
//Create a user model instance
let userModel = require('../model/user');
let User = userModel.User;
passport.use(User.createStrategy());
//serialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//register routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bookList', booksRouter);
app.use('/contactList', contactsRouter);

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
  res.render('error',{title:'Error'});
});

module.exports = app;
