let SMTPServer = require('./lib/smtpServer')
let pg = require('pg')

const env = require('./config')['production']

console.log(env.dbConnectionString)
let dbClient = new pg.Client(env.dbConnectionString)
console.log(dbClient)
let serverName = new SMTPServer(env.smtpPort, env.smtpHost, dbClient)
serverName.start()
