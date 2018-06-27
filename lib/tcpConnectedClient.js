'use strict'

class TCPConnectedClient {
  constructor (socket, handshake) {
    this.address = socket.remoteAddress
    this.port = socket.remotePort
    this.name = `${this.address}:${this.port}`
    this.socket = socket
    this.handshake = handshake
    this.QUIT_CODE = 221
  }

  receiveMessage (message) {
    this.socket.write(message)
  }

  parseMessage (message) {
    this.handshake.parseMessage(message)
  }

  closeConnection () {
    this.socket.destroy()
  }

  handleResponse (response) {
    this.receiveMessage(response)
    if (response === this.QUIT_CODE) this.closeConnection()
  }
}

module.exports = TCPConnectedClient
