const pg = require('pg')
const dbDev = require('../config')['development']['dbConnectionString']
const dbTest = require('../config')['test']['dbConnectionString']
const clientDev = new pg.Client(dbDev)
const clientTest = new pg.Client(dbTest)

clientTest.connect()
clientTest.query('CREATE TABLE mail(id SERIAL PRIMARY KEY, mailfrom VARCHAR(60), mailto VARCHAR(60), mailbody VARCHAR(200))', (err, res) => {
  if (err) {
    console.log(err)
  } else {
    clientTest
      .query("INSERT INTO mail (mailfrom, mailto, mailbody) VALUES ('George', 'Charlene', 'HI'), ('John', 'Igor', 'BYE');", (err, response) => {
        if (err) {
          console.log(err)
        }
        clientTest.end()
      })
  }
})

clientDev.connect()
clientDev.query('CREATE TABLE mail(id SERIAL PRIMARY KEY, mailfrom VARCHAR(60), mailto VARCHAR(60), mailbody VARCHAR(200))', (err, res) => {
  if (err) {
    console.log(err)
  } else {
    clientDev
      .query("INSERT INTO mail (mailfrom, mailto, mailbody) VALUES ('George@test.com', 'Charlene@test.com', 'HI'), ('John@test.com', 'Igor@test.com', 'BYE');", (err, response) => {
        if (err) {
          console.log(err)
        }
        clientDev.end()
      })
  }
})
