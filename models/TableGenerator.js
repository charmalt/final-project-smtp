require('dotenv').config()

const pg = require('pg')

const dbConnections = [process.env.PGTEST, process.env.PGDEVELOPMENT]

dbConnections.forEach((connection) => {
  const client = new pg.Client(connection)
  client.connect()
  const query = client.query(
    'CREATE TABLE mail(id SERIAL PRIMARY KEY, mailfrom VARCHAR(60), mailto VARCHAR(60), mailbody VARCHAR(200))')
  query.on('end', () => { client.end() })
})
