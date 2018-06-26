'use strict'

class TCPClient {
  constructor (socket) {
    this.address = socket.remoteAddress
    this.port = socket.remotePort
    this.name = `${this.address}:${this.port}`
  }
}

module.exports = TCPClient
