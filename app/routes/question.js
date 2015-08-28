'use strict';

/**
 * Module dependencies.
 */
var express  = require('express'),
    Question = require('../models/question'),
    Answer   = require('../models/answer'),
    User     = require('../models/user'),
    BPromise = require('bluebird'),
    router   = express.Router();

module.exports = function(app) {

  /*
   * Middleware
   */
  var populateQuestionInfo = function(req, res, next) {
    var questionId = req.body.questionId || req.params.questionId;
    Question.findById(questionId, function(err, question) {
      if (err || !question) return next(err);
      User.findById(question.author, function(err, user) {
        req.question = question;
        req.question.author = user;
        next();
      });
    });
  };

  /*
   * Question Routes
   */

  // Get list questions
  router.get('/list', function(req, res, next) {
    Question.find()
      .sort('-created')
      .populate('author')
      .exec(function(err, data) {
        if (err) return next(err);
        return res.status(200).send(data);
      });
  });

  // Get list 5 popular questions (based on the answer numbers)
  router.get('/popular', function(req, res, next) {
    Question.aggregate(
      [
        {
          '$project': {
            'title': 1,
            'content': 1,
            'created': 1,
            'updated': 1,
            'author': 1,
            'answers': 1,
            'length': { '$size': '$answers' }
          }
        },
        { '$sort': { 'length': -1 } },
        { '$limit': 5 }
      ],
      function(err, results) {
        if (err) return next(err);
        return res.status(200).send(results);
      }
    );
  });

  // Create a new question
  router.post('/create', function(req, res, next) {
    var question = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.user._id
    };

    Question.create(question, function(err, newQuestion) {
      if (err) return next(err);
      return res.status(200).send(newQuestion);
    });
  });

  // View question
  router.get('/:questionId', populateQuestionInfo, function(req, res, next) {
    Question.findById(req.params.questionId)
      .populate('answers')
      .populate('author')
      .exec(function(err, data) {
        if (err) return next(err);
        var promises = data.answers.map(function(answer) {
          return User.findById(answer.author).exec().then(function(user) {
            answer = answer.toObject();
            answer.author = user;
            return answer;
          });
        });
        return BPromise.all(promises).then(function(answers) {
          data = data.toObject();
          data.answers = answers;
          return res.status(200).send(data);
        });
      });
  });

  // Vote question
  router.post('/:questionId/votes', function(req, res, next) {
    Question.findById(req.params.questionId, function(err, question) {
      if (err) return next(err);

      if (req.body.type === 'up') question.votes++;
      else if (req.body.type === 'down') question.votes--;

      question.save(function(err, data) {
        if (err) return next(err);
        return res.status(200).send('OK');
      });
    });
  });

  // Vote answer
  router.post('/answer/:answerId/votes', function(req, res, next) {
    Answer.findById(req.params.answerId, function(err, answer) {
      if (err) return next(err);

      if (req.body.type === 'up') answer.votes++;
      else if (req.body.type === 'down') answer.votes--;

      answer.save(function(err, data) {
        if (err) return next(err);
        return res.status(200).send('OK');
      });
    });
  });

  // Toggle best answer
  router.post('/:questionId/answer/:answerId/best', function(req, res, next) {
    Question.findById(req.params.questionId, function(err, question) {
      if (err) return next(err);

      question.best_answer = req.params.answerId;

      question.save(function(err, data) {
        if (err) return next(err);
        return res.status(200).send('OK');
      });
    });
  });

  /*
   * Answer Routes
   */

  // Create an answer for the specific question
  router.post('/:questionId/answer', populateQuestionInfo, function(req, res, next) {
    var answer = {
      content: req.body.content,
      author: req.user._id,
      questionId: req.params.questionId
    };

    Answer.create(answer, function(err, data) {
      if (err) return next(err);

      req.question.answers.push(data);
      req.question.save(function(err) {
        if (err) return next(err);

        // Send email notifications to question's author
        if (req.user._id.toString() !== req.question.author.toString()) {
          var message = {
            recipients: [req.question.author.email],
            subject: '[Basic FAQ] Someone has answered your question "' + req.question.title + '"',
            text: 'Hi ' + req.question.author.displayName + ', the user ' + req.user.username + ' has answered your question with the following content: ' + data.content
          };

          app.sendMail(message);
        }

        return res.status(200).send('OK');
      });
    });
  });

  return router;
};