'use strict';

const getRateService = require('../services/getRateService');

class RateController {
  async getRate(req, res) {
    try {
      const rate = await getRateService();
      res.status(200).json(rate);
    } catch (err) {
      res.status(400).send();
    }
  }
}

module.exports = new RateController();
