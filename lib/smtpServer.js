const TCPServer = require('./tcpServer')

class SMTPServer {
  constructor (port, address) {
    this.port = port || 1337
  }
}

module.exports = SMTPServer
