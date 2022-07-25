'use strict';

const subscribeService = require('../services/subscribeService');

class SubscribeController {
  async subscribe(req, res) {
    try {
      const { email } = req.query;
      await subscribeService(email);

      res.status(200).send();
    } catch (err) {
      res.status(409).send();
    }
  }
}

module.exports = new SubscribeController();
