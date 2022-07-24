'use strict';

const express = require('express');
const rateRouter = require('./routers/rateRouter');
const subscribeRouter = require('./routers/subscribeRouter');
const app = express();

app.use(express.json());
app.use('/rate', rateRouter);
app.use('/subscribe', subscribeRouter);

module.exports = app;
