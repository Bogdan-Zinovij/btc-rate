'use strict';

const fetch = require('node-fetch');
const { BTC_TO_UAH_URL } = require('../config.js');

const getRateService = async () => {
  const response = await fetch(BTC_TO_UAH_URL);
  const data = await response.json();

  if (!data.price) {
    throw new Error('Unexpected response from the 3rd party service');
  } else {
    const rate = parseInt(data.price);
    return rate;
  }
};

module.exports = getRateService;
