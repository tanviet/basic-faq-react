'use strict';

/**
 * Module dependencies.
 */
var express        = require('express');
var path           = require('path');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var nunjucks       = require('nunjucks');
var mongoose       = require('mongoose');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var database       = require('./config/database');
var User           = require('./app/models/user');
var port           = process.env.PORT || 4000;

var app = express();
var server = require('http').createServer(app);
var mailgun = require('./worker/mailgun')(app);

var userRoutes = require('./app/routes/user')(app);
var questionRoutes = require('./app/routes/question')(app);

app.use(express.static(path.join(__dirname, 'public')));    // set the static files location /public/img will be /img for users
app.use(logger('dev'));                                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));        // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                 // parse application/json
app.use(methodOverride());                                  // simulate DELETE and PUT
app.use(cookieParser());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Passport configuration
app.use(require('express-session')({
  secret: 'basic-faq-secret-keyword',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// Use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes setup (should put it after Passport configuration)
app.use('/', userRoutes);
app.use('/api/question', questionRoutes);

// Connect database
mongoose.connect(database.url);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error-handling middleware
app.use(function(err, req, res, next) {
  // Show the error message in development environment
  var error = (app.get('env') === 'development') ? err : {};

  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: error
  });
});

server.listen(port);
console.log('Server is running on '+ port);

exports = module.exports = app;