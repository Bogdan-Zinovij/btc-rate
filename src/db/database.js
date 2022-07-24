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

  async clearDB() {
    await fs.writeFile(this.#dataFilepath, '');
    this.#emails = [];
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

module.exports = Database;
