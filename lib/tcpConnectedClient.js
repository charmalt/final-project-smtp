'use strict'

class TCPConnectedClient {
  constructor (socket, handshake) {
    this.address = socket.remoteAddress
    this.port = socket.remotePort
    this.name = `${this.address}:${this.port}`
    this.socket = socket
    this.handshake = handshake
    this.QUIT_CODE = this.handshake.responses['quit']
  }

  receiveMessage (message) {
    this.socket.write(message)
  }

  parseMessage (message) {
    let response = this.handshake.parseMessage(message)
    this.handleResponse(response)
  }

  closeConnection () {
    this.socket.destroy()
  }

  handleResponse (response) {
    this.receiveMessage(response.toString())
    if (response === this.QUIT_CODE) this.closeConnection()
  }
}

module.exports = TCPConnectedClient
