'use strict';

var QuestionAPI = require('../utils/QuestionAPI');
var QuestionStore = require('../stores/QuestionStore');

function getData() {
  return {
    stats: QuestionStore.loadStats()
  }
}

var GeneralStats = React.createClass({
  getInitialState : function() {
    return getData();
  },

  componentDidMount: function() {
    QuestionAPI.loadStats();
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="stats">
        <div className="row">
          <div className="col-md-6 item stat-questions">
            <div className="number">
              <i className="fa fa-question-circle"></i>
              { this.state.stats.questions }
            </div>
            <div className="text">Questions</div>
          </div>
          <div className="col-md-6 item stat-answers">
            <div className="number">
              <i className="fa fa-comments-o"></i>
              { this.state.stats.answers }
            </div>
            <div className="text">Answers</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 item stat-users">
            <div className="number">
              <i className="fa fa-users"></i>
              { this.state.stats.users }
            </div>
            <div className="text">Users</div>
          </div>
          <div className="col-md-6 item stat-categories">
            <div className="number">
              <i className="fa fa-tags"></i>
              { this.state.stats.categories }
            </div>
            <div className="text">Categories</div>
          </div>
        </div>
      </div>
    )
  },

  _onChange: function(data) {
    this.setState(getData());
  }
});

module.exports = GeneralStats;