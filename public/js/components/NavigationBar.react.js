'use strict';

var Link = ReactRouter.Link;
var ActionButton;

var LoggedButton = React.createClass({
  render: function() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/register">Register</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    )
  }
});

var UnloggedButton = React.createClass({
  render: function() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/#/create">Create New Question</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    )
  }
});

// Check user status to show buttons
if (_.isEmpty(USER)) {
  ActionButton = <LoggedButton />;
} else {
  ActionButton = <UnloggedButton />;
}

var NavigationBar = React.createClass({
  render: function() {
    return (
      <header className="navbar navbar-static-top bs-docs-nav" id="top" role="banner">
        <nav className="navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Basic FAQ Page</a>
            </div>
            { ActionButton }
          </div>
        </nav>
      </header>
    )
  }
});

module.exports = NavigationBar;