let SMTPServer = require('./lib/smtpServer')
let pg = require('pg')

const config = require('./config')['production']

let domain = 'test.com'
let dbClient = new pg.Client(config.dbConnectionString)
let serverName = new SMTPServer({ port: config.smtpPort, host: config.smtpHost, domain: domain, client: dbClient })
serverName.start()
