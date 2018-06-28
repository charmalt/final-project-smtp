const pg = require('pg')
const env = require('./config')
const connectionString = process.env.DATABASE_URL || env['development']

const client = new pg.Client(connectionString)
client.connect()
const query = client.query(
  'CREATE TABLE mail(id SERIAL PRIMARY KEY, mailfrom VARCHAR(60), mailto VARCHAR(60), mailbody VARCHAR(200))')
query.on('end', () => { client.end() })

const connectionStringTest = process.env.DATABASE_URL || env['test']

const clientTest = new pg.Client(connectionStringTest)
clientTest.connect()
const queryTest = clientTest.query(
  'CREATE TABLE mail(id SERIAL PRIMARY KEY, mailfrom VARCHAR(60), mailto VARCHAR(60), mailbody VARCHAR(200))')
queryTest.on('end', () => { clientTest.end() })
