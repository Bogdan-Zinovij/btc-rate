'use strict';

const fetch = require('node-fetch');

const getRateService = async () => {
  const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH';
  const response = await fetch(url);
  const data = await response.json();

  if (!data.price) {
    throw new Error('Unexpected response from the 3rd party service');
  } else {
    const rate = parseInt(data.price);
    return rate;
  }
};

module.exports = getRateService;
