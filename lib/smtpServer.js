const TCPServer = require('./tcpServer')

class SMTPServer {
  constructor (port, address, server) {
    this.port = port || 1337
    this.address = address || '127.0.0.1'
    this.server = server || new TCPServer(this.port, this.address)
  }
}

module.exports = SMTPServer
