require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('hbs');
const passport = require('passport');

// Bring in the database
require('./app_api/models/db');

// This line avoids errors with the user schema
require('./app_api/models/user');

require('./app_api/config/passport');

// Define routers
var indexRouter = require('./app_server/routes/index');
var roomsRouter = require('./app_server/routes/rooms');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var aboutRouter = require('./app_server/routes/about');
var contactRouter = require('./app_server/routes/contact');
// I added a login button
const loginRouter = require('./app_server/routes/login');
var mealsRouter = require('./app_server/routes/meals');
var newsRouter = require('./app_server/routes/news');

var apiRouter = require('./app_api/routes/index');

//var handlebars = require('hbs');

// Register a custom Handlebars helper named 'eq' to check for equality.
// This helper is used in the header and footer partials to determine
// which navigation item should be highlighted.
// 'eq' stands for "equal" and compares two values.
handlebars.registerHelper('eq', function (a, b) { // The parameters 'a' and 'b' represent the two values to be compared.
  return a === b;
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials (https://www.npmjs.com/package/hbs)
handlebars.registerPartials(__dirname + '/app_server/views/partials'); 

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Enable CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// wire-up routes to controllers
app.use('/', indexRouter);
app.use('/rooms', roomsRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/about', aboutRouter)
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/api', apiRouter); 

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

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
  res.render('error');
});

module.exports = app;
