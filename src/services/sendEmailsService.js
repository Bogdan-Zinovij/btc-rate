'use strict';

require('dotenv').config();
const db = require('../db/database');
const nodemailer = require('nodemailer');
const getRateService = require('./getRateService');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

const sendEmailsService = async () => {
  const emails = await db.getAllEmails();
  if (!emails.length) {
    throw new Error('The recipient list is empty');
  }

  const { token } = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: token,
    },
  });

  const rate = await getRateService();

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: emails,
    subject: 'BTC-rate',
    text: `Current btc rate: ${rate}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailsService;
