'use strict';

const Router = require('express');
const subscribeRouter = new Router();
const subscribeController = require('../controllers/subscribeController');

subscribeRouter.post('/', subscribeController.subscribe);

module.exports = subscribeRouter;
