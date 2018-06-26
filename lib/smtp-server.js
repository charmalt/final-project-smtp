const net = require('net')

class Server {
  constructor (port, address) {
    this.port = port
    this.address = address
  }

  start () {
    this.server = net.createServer()
  }
}

module.exports = Server
