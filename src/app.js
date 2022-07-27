'use strict';

const express = require('express');
const rateController = require('./controllers/rateController');
const subscribeController = require('./controllers/subscribeController');
const sendEmailsController = require('./controllers/sendEmailsController');
const { emailValidationScheme } = require('./validation/emailValidation');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.get('/rate', rateController.getRate);
app.post(
  '/subscribe',
  bodyParser.urlencoded({ extended: true }),
  emailValidationScheme,
  subscribeController.subscribe
);
app.post('/sendEmails', sendEmailsController.sendEmails);

module.exports = app;
