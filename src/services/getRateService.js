'use strict';

const fetch = require('node-fetch');

const getRateService = async () => {
  const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH';
  const options = {
    method: 'GET',
  };
  const response = await fetch(url, options).then(res => res.json());

  if (!response.price) {
    throw new Error('Unexpected response from the 3rd party service');
  } else {
    return +response.price;
  }
};

module.exports = getRateService;
