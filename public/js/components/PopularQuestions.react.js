'use strict';

var QuestionAPI = require('../utils/QuestionAPI');
var QuestionStore = require('../stores/QuestionStore');

function getData() {
  return {
    questions: QuestionStore.loadPopularQuestions()
  }
}

var PopularQuestions = React.createClass({
  getInitialState : function() {
    return getData();
  },

  componentDidMount: function() {
    QuestionAPI.loadPopularQuestions();
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="stats">
        <div className="widget-title row">Popular Questions</div>
        <div className="widget-content widget-popular-questions row">
          {
            this.state.questions.map(function(question) {
              return (
                <div className="item">
                  <a href={'/#/questions/' + question._id} target="_blank">{ question.title }</a>
                  <span className="more">
                    <i className="fa fa-comments-o"></i>
                    { question.length }
                  </span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  },

  _onChange: function(data) {
    this.setState(getData());
  }
});

module.exports = PopularQuestions;