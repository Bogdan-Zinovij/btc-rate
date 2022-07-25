'use strict';

const express = require('express');
const rateController = require('./controllers/rateController');
const subscribeController = require('./controllers/subscribeController');
const app = express();

app.use(express.json());
app.use('/rate', rateController.getRate);
app.use('/subscribe', subscribeController.subscribe);

module.exports = app;
