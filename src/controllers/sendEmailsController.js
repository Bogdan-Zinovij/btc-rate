'use strict';

const sendEmailsService = require('../services/sendEmailsService');

class sendEmailsController {
  async sendEmails(req, res) {
    try {
      const unsentEmails = await sendEmailsService();
      if (unsentEmails.length) {
        return res.status(200).json(unsentEmails);
      }

      res.status(200).send();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new sendEmailsController();
