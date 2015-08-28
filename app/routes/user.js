'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    express  = require('express'),
    async    = require('async'),
    _        = require('lodash'),
    Question = require('../models/question'),
    User     = require('../models/user'),
    Answer   = require('../models/answer'),
    router   = express.Router();

module.exports = function(app) {

  /*
   * Base Routes
   */
  router.get('/', function(req, res, next) {
    var user = req.user ? req.user.toObject() : null;
    res.render('index', {title: 'Basic FAQ page' , user: user});
  });

  router.get('/stats', function(req, res, next) {
    return async.parallel({
      totalQuestions: function(cb) {
        Question.count(cb);
      },
      totalAnswers: function(cb) {
        Answer.count(cb);
      },
      totalUsers: function(cb) {
        User.count(cb);
      },
      totalCategories: function(cb) {
        Question.find({}, function(err, questions) {
          if (err) return next(err);

          var category;
          var cats = [];

          _.forEach(questions, function(question) {
            category = question.category.split(',');
            cats.push.apply(cats, category);
          });

          // Remove duplicated category
          cats = _.uniq(cats);

          cb(null, cats.length);
        });
      }
    }, function(err, results) {
      if (err) return next(err);

      var resResult = {
        questions: results.totalQuestions,
        answers: results.totalAnswers,
        users: results.totalUsers,
        categories: results.totalCategories
      };

      return res.status(200).send(resResult);
    });
  });

  router.get('/categories', function(req, res, next) {
    Question.find({}, function(err, questions) {
      if (err) return next(err);

      var category;
      var cats = [];

      _.forEach(questions, function(question) {
        category = question.category.split(',');
        cats.push.apply(cats, category);
      });

      // Remove duplicated category
      cats = _.uniq(cats);

      return res.status(200).send(cats);
    });
  });

  /*
   * User Routes
   */
  router.get('/register', function(req, res) {
    res.render('register');
  });

  router.post('/register', function(req, res) {
    User.register(new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: req.body.firstName + ' ' + req.body.lastName,
      email: req.body.email,
      username: req.body.username
    }), req.body.password, function(err, newUser) {
      if (err) return res.status(400).send({err: err});
      return passport.authenticate('local')(req, res, function() {
        return res.redirect('/');
      });
    });
  });

  router.get('/login', function(req, res) {
    res.render('login');
  });

  router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  return router;
};