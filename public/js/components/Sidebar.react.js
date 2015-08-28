'use strict';

var GeneralStats = require('./GeneralStats.react');
var CategoryStats = require('./CategoryStats.react');
var PopularQuestions = require('./PopularQuestions.react');

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="col-md-3 col-sm-12 col-xs-12">
        <GeneralStats/>
        <PopularQuestions/>
        <CategoryStats/>
      </div>
    )
  }
});

module.exports = Sidebar;