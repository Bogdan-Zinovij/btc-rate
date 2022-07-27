'use strict';

const sendEmailsService = require('../services/sendEmailsService');

class sendEmailsController {
  async sendEmails(req, res) {
    try {
      await sendEmailsService();
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  }
}

module.exports = new sendEmailsController();
