# Basic FAQ page

This app is using Nodejs, Expressjs, MongoDB, Reactjs.

### Installation

- Install [Nodejs](https://nodejs.org/download/)
- Install [MongoDB](https://www.mongodb.org/downloads)
- Run `npm install`
- Run `bower install`
- Add your Mailgun key in `config/mailgun.js` file
- Run `grunt browserify` to create `public/js/build.js` file (if this file doesn't exist)
- Run `node server.js` or `grunt` to start server and access the address `http://localhost:4000` to see the app

### Note

- If you cannot build file successfully with `grunt browserify`, you should clear all data in `build.js` file and build this file again.

### Features

- User can login/register account.
- View list questions, a question and answer the question.
- User can create questions.
- Author can receive the email if someone has answered his/her questions.
- User can upvote/downvote for questions and answers.