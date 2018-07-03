require('dotenv').config()
const pg = require('pg')

class DBConnection {
  constructor (dbClient = new pg.Client(process.env.PGPROD)) {
    this.client = dbClient
    this.client.connect()
  }
}

module.exports = DBConnection
