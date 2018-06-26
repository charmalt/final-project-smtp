const net = require('net');

class Server {
  constructor (port, address) {
    this.port = port
    this.address = address
  }

  start () {
    console.log('Server started')
  }
}

module.exports = Server
