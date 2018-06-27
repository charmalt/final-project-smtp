const TCPServer = require('./tcpServer')
const Handshake = require('./smtpClientHandshakeLogic')

class SMTPServer {
  constructor (port, address) {
    this.port = port || 1337
    this.address = address || '127.0.0.1'
    this.server = new TCPServer(this.port, this.address, Handshake)
  }

  start () {
    this.server.start()
  }

  close () {
    this.server.close()
  }
}

module.exports = SMTPServer
