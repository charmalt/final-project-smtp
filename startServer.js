// file requires .env.js to be configured, please see README for details.
let ENV = require('./.env')
let SMTPServer = require('./lib/SMTPServer')
let server = new SMTPServer(ENV['DEFAULT_PORT'], ENV['DEFAULT_ADDRESS'])

server.start()
