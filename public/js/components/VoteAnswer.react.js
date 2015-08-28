'use strict';

var QuestionAPI = require('../utils/QuestionAPI');
var QuestionStore = require('../stores/QuestionStore');
var QuestionConstants = require('../constants/QuestionConstants');
var type;

var VoteAnswer = React.createClass({
  getInitialState : function() {
    return {
      votes: this.props.votes,
      answerId: this.props.answerId
    };
  },

  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
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

    // Authorized user before voting the answer
    if (_.isEmpty(USER)) {
      alert('Please login first before voting this answer.');
      return;
    } else {
      QuestionAPI.voteAnswer(this.state.answerId, action);
    }
  },

  _onChange: function(data) {
    if (data === QuestionConstants.VOTE_ANSWER) {
      location.reload();
    }
  }
});

module.exports = VoteAnswer;