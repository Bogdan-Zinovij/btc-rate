'use strict';

const db = require('../db/db');

const subscribeService = async email => {
  const isEmailExists = await db.checkEmail(email);
  if (isEmailExists) {
    throw new Error('This email is already subscribed');
  }

  await db.insertEmail(email);
};

module.exports = subscribeService;
