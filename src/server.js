'use strict';

require('dotenv').config();
const db = require('./db/db');

const app = require('./app');

const EXPRESS_PORT = process.env.EXPRESS_PORT || 8080;
const HOST = process.env.HOST || 'localhost';

(async () => {
  try {
    await db.connect();
    // await db.clearDB();
  } catch (err) {
    console.log(err);
  }
  app.listen(EXPRESS_PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${EXPRESS_PORT}`);
  });
})();
