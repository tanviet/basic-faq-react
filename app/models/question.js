'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/**
 * Question Schema
 */
var Question = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  category: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  votes: {
    type: Number,
    default: 0
  },
  best_answer: {
    type: Schema.ObjectId,
    ref: 'Answer'
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    require: true
  },
  answers : [{
    type: Schema.ObjectId,
    ref: 'Answer'
  }]
});

module.exports = mongoose.model('Question', Question);
