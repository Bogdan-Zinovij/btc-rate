'use strict';

const db = require('../db/database');

const checkEmailService = async email => {
  const isEmailSubscribed = await db.checkEmail(email);

  return isEmailSubscribed;
};

module.exports = checkEmailService;
