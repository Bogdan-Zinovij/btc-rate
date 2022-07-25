'use strict';

require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

class Database {
  #emails = [];
  #dataFilename = 'emails.txt';
  #dataDirectory;
  #dataFilepath;

  constructor() {
    this.#dataDirectory = path.join(__dirname, process.env.DB_FOLDER);
    this.#dataFilepath = path.join(this.#dataDirectory, this.#dataFilename);
  }

  async connect() {
    await fs.mkdir(path.join(this.#dataDirectory), { recursive: true });
    await fs
      .access(path.join(this.#dataDirectory, this.#dataFilename))
      .catch(err => {
        fs.writeFile(this.#dataFilepath, '');
      });
    const dataStr = await fs.readFile(this.#dataFilepath, {
      encoding: 'utf-8',
    });
    this.#emails = dataStr.trim().split(' ');
  }

  async insertEmail(email) {
    await fs.appendFile(this.#dataFilepath, email + ' ');
    this.#emails.push(email);
  }

  async checkEmail(email) {
    return this.#emails.includes(email);
  }

  async getAllEmails() {
    const emailsCopy = this.#emails.slice();
    return emailsCopy;
  }
}

module.exports = new Database();
