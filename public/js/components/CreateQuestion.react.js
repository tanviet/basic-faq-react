'use strict';

var QuestionAPI = require('../utils/QuestionAPI');
var QuestionStore = require('../stores/QuestionStore');
var QuestionConstants = require('../constants/QuestionConstants');

var CreateQuestion = React.createClass({
  componentDidMount: function() {
    // Authorized user before creating new question
    if (_.isEmpty(USER)) {
      window.location.href = '/';
    }

    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="bl-form-create">
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">Title</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="title"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Category</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="category" placeholder="Categories separated by commas"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Content</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="content" rows="10"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button onClick={this.save} className="btn btn-default">Create</button>
            </div>
          </div>
        </form>
      </div>
    )
  },

  save: function($event) {
    $event.preventDefault();

    var title = $('#title').val();
    var content = $('#content').val();
    var category = $('#category').val();

    if (!title || !content) return;
    QuestionAPI.createQuestion({title: title, content: content, category: category});
  },

  _onChange: function(data) {
    // Redirect user to Homepage when successfully created question
    if (data === QuestionConstants.CREATE_QUESTION) {
      window.location.href = '/';
    }
  }
});

module.exports = CreateQuestion;