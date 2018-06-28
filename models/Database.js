const pg = require('pg')
const env = require('./config')
const connectionString = env['test'] || env['development']

class Database {
  post (mailto, mailfrom, mailbody) {
    const client = new pg.Client(connectionString)
    client.connect()
    const query = client.query(
      `INSERT INTO mail (mailto, mailfrom, mailbody) VALUES('${mailto}', '${mailfrom}', '${mailbody}')`)
    query.on('end', () => { client.end() })
  }
}

module.exports = Database
