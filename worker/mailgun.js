'use strict';

var config = require('../config/mailgun');
var Mailgun = require('mailgun').Mailgun;

var mg = new Mailgun(config.api_key);

module.exports = exports = function(app) {
  app.sendMail = function(message, callback) {
    mg.sendText(
      config.sender,
      message.recipients,
      message.subject,
      message.text,
      config.server_name,
      {},
      function(err) {
        // View detailed error here: https://documentation.mailgun.com/api-intro.html#errors
        if (err) console.log('Err', err);
        else console.log('Successfully sent email.');
      }
    );

    if (callback) {
      callback();
    }
  };
};
