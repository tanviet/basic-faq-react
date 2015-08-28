'use strict';

var QuestionActions = require('../actions/QuestionActions');
var questionApi = 'api/question';

module.exports = {

  loadQuestions: function() {
    $.get(questionApi + '/list')
      .done(function(data) {
        QuestionActions.loadQuestions(data);
      });
  },
  loadQuestion : function(questionId) {
    $.get(questionApi + '/' + questionId)
      .done(function(data) {
        QuestionActions.loadQuestion(data);
      });
  },
  createQuestion: function(data) {
    $.post(questionApi + '/create', {title: data.title, content: data.content, category: data.category})
      .done(function(data) {
        QuestionActions.createQuestion();
      });
  },
  createAnswer : function(questionId, data) {
    $.post(questionApi + '/' +  questionId + '/answer', {content: data})
      .done(function(data) {
        QuestionActions.createAnswer();
      });
  },
  loadStats: function() {
    $.get('/stats')
      .done(function(data) {
        QuestionActions.loadStats(data);
      });
  },
  loadCategoryStats: function() {
    $.get('/categories')
      .done(function(data) {
        QuestionActions.loadCategoryStats(data);
      });
  },
  loadPopularQuestions: function() {
    $.get(questionApi + '/popular')
      .done(function(data) {
        QuestionActions.loadPopuparQuestions(data);
      });
  },
  voteQuestion: function(questionId, action) {
    $.post(questionApi + '/' +  questionId + '/votes', {type: action})
      .done(function(data) {
        QuestionActions.voteQuestion();
      });
  },
  voteAnswer: function(answerId, action) {
    $.post(questionApi + '/answer/' +  answerId + '/votes', {type: action})
      .done(function(data) {
        QuestionActions.voteAnswer();
      });
  }

};