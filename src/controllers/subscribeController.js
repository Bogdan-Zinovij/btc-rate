'use strict';

const subscribeService = require('../services/subscribeService');
const { validationResult } = require('express-validator');
const checkEmailService = require('../services/checkEmailService');

class SubscribeController {
  async subscribe(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send();
      }

      const email = req.body.email;

      const isAlreadySubscribed = await checkEmailService(email);
      if (isAlreadySubscribed) {
        res.status(409).send();
      }

      await subscribeService(email);

      res.status(200).send();
    } catch (err) {
      res.status(400).send();
    }
  }
}

module.exports = new SubscribeController();
