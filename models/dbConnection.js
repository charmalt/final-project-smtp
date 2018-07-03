require('dotenv').config()
const pg = require('pg')
const env = process.env.ENV || 'development'
const db = require('../config')[env].dbConnectionString

class DBConnection {
  constructor (dbClient = new pg.Client(db)) {
    this.client = dbClient
    this.client.connect()
  }
}

module.exports = DBConnection
