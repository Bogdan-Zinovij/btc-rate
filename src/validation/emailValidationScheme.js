const { body } = require('express-validator');
const checkEmailService = require('../services/checkEmailService');

const emailValidationScheme = [body('email', 'Should be an email').isEmail()];

module.exports = { emailValidationScheme };
