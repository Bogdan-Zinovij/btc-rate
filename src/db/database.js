'use strict';

require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

/*All e-mails separated by a space are stored in a txt file. When connecting
to the database, all emails (if they exist) will be added to the array, 
which the database methods will work with. When subscribing to an e-mail, it
will be added to the array and to the txt file.*/

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
      .catch(async err => {
        await fs.writeFile(this.#dataFilepath, '');
      });
    const dataStr = await fs.readFile(this.#dataFilepath, {
      encoding: 'utf-8',
    });
    if (dataStr) {
      this.#emails = dataStr.trim().split(' ');
    }
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
