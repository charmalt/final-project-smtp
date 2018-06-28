'use strict'
const TCPServer = require('./tcpServer')
const Handshake = require('./smtpClientHandshakeLogic')
const MTAQueue = require('./mtaQueue')

class SMTPServer {
  constructor (port, address) {
    this.port = port || 1337
    this.address = address || '127.0.0.1'
    this.queue = new MTAQueue()
    this.server = new TCPServer(this.port, this.address, Handshake, this.queue)
  }

  start () {
    this.server.start()
  }

  close () {
    this.server.close()
  }
}

module.exports = SMTPServer
