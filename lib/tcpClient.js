'use strict'

class TCPClient {
  constructor (socket) {
    this.address = socket.remoteAddress
    this.port = socket.remotePort
  }
}

module.exports = TCPClient
