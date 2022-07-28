'use strict';

const express = require('express');
const rateController = require('./controllers/rateController');
const subscribeController = require('./controllers/subscribeController');
const sendEmailsController = require('./controllers/sendEmailsController');
const { emailValidationScheme } = require('./validation/emailValidationScheme');
const bodyParser = require('body-parser');
const { PREFIX } = require('./config');
const app = express();

app.use(bodyParser.json());
app.get(PREFIX + '/rate', rateController.getRate);
app.post(
  PREFIX + '/subscribe',
  bodyParser.urlencoded({ extended: true }),
  emailValidationScheme,
  subscribeController.subscribe
);
app.post(PREFIX + '/sendEmails', sendEmailsController.sendEmails);

module.exports = app;
