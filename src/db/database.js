'use strict';

const fs = require('fs').promises;
const path = require('path');

class Database {
  #emails = [];
  #dataFilename = 'emails.txt';
  #dataDirectory;
  #dataFilepath;

  constructor(dataDirectory) {
    this.#dataDirectory = dataDirectory;
    this.#dataFilepath = path.join(this.#dataDirectory, this.#dataFilename);
  }

  async connect() {
    fs.mkdir(path.join(this.#dataDirectory), { recursive: true });
    fs.access(path.join(this.#dataDirectory, this.#dataFilename)).catch(err => {
      fs.writeFile(this.#dataFilepath, '');
    });
    const dataStr = await fs.readFile(this.#dataFilepath, {
      encoding: 'utf-8',
    });
    this.#emails = dataStr.trim().split(' ');
  }

  async clearDB() {
    fs.writeFile(this.#dataFilepath, '');
    this.#emails = [];
  }

  async insertEmail(email) {
    fs.appendFile(this.#dataFilepath, email + ' ');
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

module.exports = Database;
