'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Answer Schema
 */
var Answer = new Schema({
  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Answer cannot be blank'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    require: true
  },
  questionId: {
    type: Schema.ObjectId,
    ref: 'Question',
    require: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Answer', Answer);
