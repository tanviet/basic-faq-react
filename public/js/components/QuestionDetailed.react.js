'use strict';

var QuestionAPI = require('../utils/QuestionAPI');
var QuestionStore = require('../stores/QuestionStore');
var NavigationBar = require('./NavigationBar.react');
var ListAnswers = require('./ListAnswers.react');
var FormatDate = require('./FormatDate.react');
var VoteQuestion = require('./VoteQuestion.react');

function getData() {
  return {
    question: QuestionStore.loadQuestion()
  };
}

var QuestionDetailed = React.createClass({
  getInitialState: function() {
    return getData();
  },

  componentDidMount: function() {
    QuestionAPI.loadQuestion(this.props.params.questionId);
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount : function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var question = this.state.question;

    if (!_.isEmpty(question)) {
      return (
        <div className="question-detail-wrapper">
          <div className="question-detail">
            <div className="row">
              <div className="col-md-1 vote">
                <VoteQuestion questionId={ question._id } votes={ question.votes }/>
              </div>
              <div className="col-md-8">
                <div className="title">{ question.title }</div>
                <div className="category">
                  <i className="fa fa-folder-open-o"></i>
                  <span className="item">{ question.category }</span>
                </div>
                <div className="timestamp">
                  <i className="fa fa-calendar"></i>
                  <FormatDate timestamp={ question.created } type="ago"/>
                </div>
              </div>
              <div className="col-md-3 pull-right">
                <div className="author-info">
                  <img src="/images/default.png" className="avatar-user"/>
                  <span className="display-name">{ question.author.displayName }</span>
                </div>
              </div>
            </div>
            <div className="hr"></div>
            <div className="question-content">{ question.content }</div>
            <div className="question-answers-number">{ question.answers.length } answers</div>
          </div>
          <ListAnswers answers={ question.answers } questionId={ question._id }/>
        </div>
      )
    } else {
      return (<div/>)
    }
  },

  _onChange : function() {
    this.setState(getData());
  }
});

module.exports = QuestionDetailed;