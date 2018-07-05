let SMTPServer = require('./lib/smtpServer')
let pg = require('pg')

const env = require('./config')['production']

let domain = 'test.com'
let dbClient = new pg.Client(env.dbConnectionString)
let serverName = new SMTPServer(env.smtpPort, env.smtpHost, domain, dbClient)
serverName.start()
