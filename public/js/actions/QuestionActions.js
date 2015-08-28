'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuestionConstants = require('../constants/QuestionConstants');

// Define action methods
var QuestionActions = {

  // Load list questions
  loadQuestions: function(data) {
    AppDispatcher.handleAction({
      actionType: QuestionConstants.LOAD_QUESTIONS,
      data: data
    });
  },

  // Load/View a question
  loadQuestion: function(data) {
    AppDispatcher.handleAction({
      actionType: QuestionConstants.LOAD_QUESTION,
      data: data
    });
  },

  // Create a new question
  createQuestion: function() {
    AppDispatcher.handleAction({
      actionType: QuestionConstants.CREATE_QUESTION
    });
  },

  // Create an answer for a question
  createAnswer: function() {
    AppDispatcher.handleAction({
      actionType: QuestionConstants.CREATE_ANSWER
    });
  },

  // Load stats
  loadStats: function(data) {
    AppDispatcher.handleAction({
      actionType: QuestionConstants.LOAD_STATS,
      data: data
    });
  },

  // Load category stats
  loadCategoryStats: function(data) {
    AppDispatcher.handleAction({
      actionType: QuestionConstants.LOAD_CATEGORY_STAT,
      data: data
    });
  },

  // Load category stats
  loadPopuparQuestions: function(data) {
    AppDispatcher.handleAction({
      actionType: QuestionConstants.LOAD_POPULAR_QUESTIONS,
      data: data
    });
  },

  // Vote question
  voteQuestion: function() {
    AppDispatcher.handleAction({
      actionType: QuestionConstants.VOTE_QUESTION
    });
  },

  // Vote answer
  voteAnswer: function() {
    AppDispatcher.handleAction({
      actionType: QuestionConstants.VOTE_ANSWER
    });
  }
};

module.exports = QuestionActions;