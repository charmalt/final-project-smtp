'use strict'

class TCPConnectedClient {
  constructor (socket, handshake) {
    this.address = socket.remoteAddress
    this.port = socket.remotePort
    this.name = `${this.address}:${this.port}`
    this.socket = socket
    this.handshake = handshake
  }

  receiveMessage (message) {
    this.socket.write(message)
  }

  parseMessage (message) {
    this.handshake.parseMessage(message)
  }
}

module.exports = TCPConnectedClient
