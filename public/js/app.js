'use strict';

var QuestionAPI = require('./utils/QuestionAPI');
var Main = require('./components/Main.react');
var QuestionDetailed = require('./components/QuestionDetailed.react');
var CreateQuestion = require('./components/CreateQuestion.react');
var Sidebar = require('./components/Sidebar.react');
var NavigationBar = require('./components/NavigationBar.react');

var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var routes = (
  <Route>
    <DefaultRoute handler={Main} />
    <Route name="question" path="/questions/:questionId" handler={QuestionDetailed} />
    <Route name="create" path="/create" handler={CreateQuestion} />
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(
    <div className="main-app">
      <div className="nav-bar">
        <NavigationBar/>
      </div>
      <div className="container">
        <div className="col-md-9 col-sm-12 col-xs-12">
          <Handler/>
        </div>
        <Sidebar/>
      </div>
    </div>, document.getElementById('list-questions')
  );
});