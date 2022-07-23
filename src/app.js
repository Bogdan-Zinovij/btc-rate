'use strict';

const express = require('express');
const rateRouter = require('./routers/rateRouter');
const app = express();

app.use(express.json());
app.use('/rate', rateRouter);

module.exports = app;
