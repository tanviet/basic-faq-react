'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuestionConstants = require('../constants/QuestionConstants');

// Define initial data points
var question = {},
    stats = {},
    questions = [],
    category_stats = [],
    popular_questions = [];

// Method to load list questions data
function loadQuestionsData(data) {
  questions = data;
}

// Method to load a question data
function loadQuestionData(data) {
  question = data;
}

// Method to load stats data
function loadStatsData(data) {
  stats = data;
}

// Method to load category stats data
function loadCategoryStatsData(data) {
  category_stats = data;
}

// Method to load popular questions
function loadPopularQuestionsData(data) {
  popular_questions = data;
}

// Extend QuestionStore with EventEmitter to add eventing capabilities
var QuestionStore = _.assign({}, EventEmitter.prototype, {

  // Return list questions data
  loadQuestions: function() {
    return questions;
  },

  // Return Question
  loadQuestion: function() {
    return question;
  },

  // Return Stats
  loadStats: function() {
    return stats;
  },

  // Return Category Stats
  loadCategoryStats: function() {
    return category_stats;
  },

  // Return Popular Questions
  loadPopularQuestions: function() {
    return popular_questions;
  },

  // Emit Change event
  emitChange: function(data) {
    this.emit('change', data);
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {

    // Respond to LOAD_QUESTIONS action
    case QuestionConstants.LOAD_QUESTIONS:
      loadQuestionsData(action.data);
      break;

    // Respond to LOAD_QUESTION action
    case QuestionConstants.LOAD_QUESTION:
      loadQuestionData(action.data);
      break;

    // Respond to LOAD_STATS action
    case QuestionConstants.LOAD_STATS:
      loadStatsData(action.data);
      break;

    // Respond to LOAD_STATS action
    case QuestionConstants.LOAD_CATEGORY_STAT:
      loadCategoryStatsData(action.data);
      break;

    // Respond to LOAD_POPULAR_QUESTIONS action
    case QuestionConstants.LOAD_POPULAR_QUESTIONS:
      loadPopularQuestionsData(action.data);
      break;
  }

  // If action was responded to, emit change event
  QuestionStore.emitChange(action.actionType);

  return true;

});

module.exports = QuestionStore;


