const net = require('net');

class Server {
  constructor (port) {
    this.port = port
  }

  start () {
    console.log('Server started')
  }
}

module.exports = Server
