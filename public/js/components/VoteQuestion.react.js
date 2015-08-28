'use strict';

var QuestionAPI = require('../utils/QuestionAPI');
var QuestionStore = require('../stores/QuestionStore');
var QuestionConstants = require('../constants/QuestionConstants');
var questionId, type;

var VoteQuestion = React.createClass({
  getInitialState : function() {
    return {
      votes: this.props.votes
    };
  },

  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    questionId = this.props.questionId;

    return (
      <ul className="list-group">
        <li className="list-group-item up">
          <i className="fa fa-chevron-up" onClick={this.vote.bind(this, 'up')}></i>
        </li>
        <li className="list-group-item number">{ this.state.votes }</li>
        <li className="list-group-item down">
          <i className="fa fa-chevron-down" onClick={this.vote.bind(this, 'down')}></i>
        </li>
      </ul>
    )
  },

  vote: function(action) {
    type = action;

    // Authorized user before voting the question
    if (_.isEmpty(USER)) {
      alert('Please login first before voting this question.');
      return;
    } else {
      QuestionAPI.voteQuestion(questionId, action);
    }
  },

  _onChange: function(data) {
    if (data === QuestionConstants.VOTE_QUESTION) {
      if (type === 'up') this.setState({votes: parseInt(this.state.votes) + 1});
      else if (type === 'down') this.setState({votes: parseInt(this.state.votes) - 1});
    }
  }
});

module.exports = VoteQuestion;