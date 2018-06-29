const Client = require('pg').Client
const env = require('./config')

class DBConnection {
  constructor (dbClient = new Client(env['test'])) {
    this.client = dbClient
  }
}

module.exports = DBConnection
