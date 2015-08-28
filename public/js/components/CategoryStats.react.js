'use strict';

var QuestionAPI = require('../utils/QuestionAPI');
var QuestionStore = require('../stores/QuestionStore');

function getData() {
  return {
    categories: QuestionStore.loadCategoryStats()
  }
}

var CategoryStats = React.createClass({
  getInitialState : function() {
    return getData();
  },

  componentDidMount: function() {
    QuestionAPI.loadCategoryStats();
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="stats">
        <div className="widget-title row">Categories</div>
        <div className="widget-content widget-category row">
          {
            this.state.categories.map(function(category) {
              return (
                <div className="item">{ category }</div>
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

module.exports = CategoryStats;