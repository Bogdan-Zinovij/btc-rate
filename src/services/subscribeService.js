'use strict';

const db = require('../db/database');

const subscribeService = async email => {
  await db.insertEmail(email);
};

module.exports = subscribeService;
