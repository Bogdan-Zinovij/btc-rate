'use strict';

const subscribeService = require('../services/subscribeService');

class SubscribeController {
  async subscribe(req, res) {
    try {
      const email = req.body.email;
      if (!email) {
        throw new Error('The email parameter must be defined');
      }

      await subscribeService(email);

      res.status(200).json({
        status: 'success',
        message: 'This email has been succesfully subscribed',
      });
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: err.message,
      });
    }
  }
}

module.exports = new SubscribeController();
