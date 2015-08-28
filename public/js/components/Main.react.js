'use strict';

var QuestionAPI = require('../utils/QuestionAPI');
var QuestionStore = require('../stores/QuestionStore');
var ListQuestions = require('./ListQuestions.react');
var NavigationBar = require('./NavigationBar.react');

var Link = ReactRouter.Link;

function getData() {
  return {
    questions: QuestionStore.loadQuestions()
  }
}

var Main = React.createClass({
  getInitialState : function() {
    return getData();
  },

  componentDidMount: function() {
    QuestionAPI.loadQuestions();
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var questions = this.state.questions;

    if (questions.length) {
      return (
        <ListQuestions questions={questions}/>
      );
    } else if (!_.isEmpty(USER)) {
      return (
        <Link to="create">No questions found. Do you want to add new questions?</Link>
      )
    } else {
      return (<div/>)
    }
  },

  _onChange: function() {
    this.setState(getData());
  }
});

module.exports = Main;