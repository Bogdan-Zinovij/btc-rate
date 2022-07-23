'use strict';

const getRateService = require('../services/getRateService');

class RateController {
  async getRate(req, res) {
    try {
      const rate = await getRateService();
      res.status(200).json({
        status: 'success',
        message: 'BTC rate successfully received',
        data: rate,
      });
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: err.message,
      });
    }
  }
}

module.exports = new RateController();
