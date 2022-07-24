'use strict';

require('dotenv').config();
const path = require('path');
const Database = require('./database');

const dataDirectory = path.join(__dirname, process.env.DB_FOLDER);
const db = new Database(dataDirectory);

module.exports = db;
