'use strict';

var QuestionAPI = require('../utils/QuestionAPI');
var QuestionStore = require('../stores/QuestionStore');
var QuestionConstants = require('../constants/QuestionConstants');
var FormatDate = require('./FormatDate.react');
var VoteAnswer = require('./VoteAnswer.react');
var PostAnswerButton, answer, questionId;

///////// LOGIN FOR UNAUTHENTICATED USERS /////////

var Login = React.createClass({
  render: function() {
    return (
      <div className="notification">You need to <a href="/login">login</a> first to post your answers.</div>
    )
  }
});

///////// CREATE NEW ANSWER /////////

var CreateAnswer = React.createClass({
  render: function() {
    return (
      <div className="post-answer row">
        <textarea className="form-control answer-text" id="answer" placeholder="Enter your answer" rows="10"></textarea>
        <button className="btn btn-primary answer-submit" onClick={this.save}>Post Answer</button>
      </div>
    )
  },

  save: function($event) {
    $event.preventDefault();

    answer = $('#answer').val();

    if (!answer) return;
    QuestionAPI.createAnswer(questionId, answer);
  }
});

///////// CHECK USER STATUS TO SHOW BUTTONS /////////

if (!_.isEmpty(USER)) {
  PostAnswerButton = <CreateAnswer />;
} else {
  PostAnswerButton = <Login />;
}

///////// SHOW LIST ANSWERS /////////

var ListAnswers = React.createClass({
  componentDidMount: function() {
    questionId = this.props.questionId;
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var answers = this.props.answers;

    return (
      <div className="answers">
        {
          answers.map(function(answer) {
            return (
              <div className="answer-detail row">
                <div className="col-md-1 vote">
                  <VoteAnswer answerId={ answer._id } votes={ answer.votes }/>
                </div>
                <div className="col-md-11 content">
                  <div className="answer-author">
                    <span className="display-name">{ answer.author.displayName }</span>
                    <span className="icon">
                      <i className="fa fa-clock-o"></i>
                    </span>
                    <span className="timestamp">
                      <FormatDate timestamp={ answer.created } type="standard"/>
                    </span>
                  </div>
                  <div className="answer-content">{ answer.content }</div>
                </div>
              </div>
            )
          })
        }
        { PostAnswerButton }
      </div>
    )
  },

  _onChange: function(data) {
    // After submitting answer successfully, we shall add answer into list answers instead of reloading page
    if (data === QuestionConstants.CREATE_ANSWER) {
      $('#answer').val('');

      var obj = {
        content: answer,
        author: USER.displayName ? {displayName: USER.displayName} : 'Anonymous',
        created: new Date().toISOString(),
        votes: 0
      };

      this.props.answers.push(obj);
      this.setState(this.props.answers);

      // Get the stats info after posting new answer
      QuestionAPI.loadStats();
      QuestionAPI.loadPopularQuestions();
    }
  }
});

module.exports = ListAnswers;