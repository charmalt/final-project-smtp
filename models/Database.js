const pg = require('pg')
const env = require('./config')
const connectionString = env['test'] || env['development']

class Database {
  post (message) {
    const client = new pg.Client(connectionString)
    client.connect()
    const query = client.query(
      `INSERT INTO mail (email) VALUES('${message}')`)
    query.on('end', () => { client.end() })
  }
}

module.exports = Database
