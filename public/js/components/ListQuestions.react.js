'use strict';

var FormatDate = require('./FormatDate.react');

var Link = ReactRouter.Link;

var ListQuestions  = React.createClass({
  render: function() {
    // Get list questions from args
    var questions = this.props.questions || [];

    return (
      <div className="question-list">
      {
        questions.map(function(question) {
          return (
            <div className="question row">
              <div className="col-md-2 image-user">
                <img src="/images/default.png" className="avatar-user"/>
                <div className="display-name">{ question.author.displayName }</div>
              </div>
              <div className="col-md-6 qmain">
                <Link to="question" params={{ questionId: question._id }} className="title">{ question.title }</Link>
                <div className="timestamp">
                  <i className="fa fa-calendar"></i>
                  <FormatDate timestamp={ question.created } type="ago"/>
                </div>
              </div>
              <div className="col-md-4 info row">
                <div className="col-md-6">
                  <div className="answers-number">{ question.votes }</div>
                  <div className="answers-text">Votes</div>
                </div>
                <div className="col-md-6">
                  <div className="answers-number">{ question.answers.length }</div>
                  <div className="answers-text">Answers</div>
                </div>
              </div>
            </div>
          )
        })
      }
      </div>
    );
  }
});

module.exports = ListQuestions;