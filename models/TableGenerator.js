require('dotenv').config()

const pg = require('pg')
const env = process.env.ENV || 'development'
const dbConnection = require('../config')[env].dbConnectionString

const client = new pg.Client(dbConnection)
client.connect()
const query = client.query(
  'CREATE TABLE mail(id SERIAL PRIMARY KEY, mailfrom VARCHAR(60), mailto VARCHAR(60), mailbody VARCHAR(200))')
query.on('end', () => { client.end() })
