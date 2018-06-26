const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/mailbox';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE mail(id SERIAL PRIMARY KEY, email VARCHAR(200))');
query.on('end', () => { client.end(); });

const connectionStringTest = process.env.DATABASE_URL || 'postgres://localhost:5432/testmailbox';

const clientTest = new pg.Client(connectionStringTest);
clientTest.connect();
const queryTest = client2.query(
  'CREATE TABLE mail(id SERIAL PRIMARY KEY, email VARCHAR(200))');
queryTest.on('end', () => { clientTest.end(); });
