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
    return;
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

  const unsentEmails = await Promise.allSettled(
    emails.map(email => {
      return new Promise(async (resolve, reject) => {
        const mailOptions = {
          from: process.env.MAIL_USERNAME,
          to: email,
          subject: 'BTC-rate',
          text: `Exchange rate of BTC to UAH: ${rate}`,
        };

        try {
          await transporter.sendMail(mailOptions);
          resolve(email);
        } catch (err) {
          reject(email);
        }
      });
    })
  ).then(results => {
    const unsent = [];
    results.forEach(result => {
      if (result.status == 'rejected') {
        unsent.push(result.reason);
      }
    });

    return unsent;
  });

  return unsentEmails;
};

module.exports = sendEmailsService;
