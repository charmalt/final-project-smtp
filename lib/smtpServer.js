const TCPServer = require('./tcpServer')

class SMTPServer {
  constructor (port, address) {
    this.port = port || 1337
    this.address = address || '127.0.0.1'
    this.server = new TCPServer(this.port, this.address)
  }

  start () {
    this.server.start()
  }

  close () {
    this.server.close()
  }
}

module.exports = SMTPServer
