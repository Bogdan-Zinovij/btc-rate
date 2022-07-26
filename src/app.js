'use strict';

const express = require('express');
const rateController = require('./controllers/rateController');
const subscribeController = require('./controllers/subscribeController');
const sendEmailsController = require('./controllers/sendEmailsController');
const app = express();

app.use(express.json());
app.get('/rate', rateController.getRate);
app.post('/subscribe', subscribeController.subscribe);
app.post('/sendEmails', sendEmailsController.sendEmails);

module.exports = app;
