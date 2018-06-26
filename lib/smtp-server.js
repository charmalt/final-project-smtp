const net = require('net')

class Server {
  constructor (port, address) {
    this.port = port
    this.address = address
  }

  start () {
    this.connection = net.createServer((socket) => {
    })

    this.connection.listen(this.port, this.address)
  }
}

module.exports = Server
