'use strict';

const Router = require('express');
const rateRouter = new Router();
const rateController = require('../controllers/rateController');

rateRouter.get('/', rateController.getRate);

module.exports = rateRouter;
