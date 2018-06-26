const net = require('net')

class Server {
  constructor (port, address) {
    this.port = port
    this.address = address
  }

  start () {
    this.connection = net.createServer((socket) => {
      this.createClient(socket)

      socket.on('data', (data) => {
        // TBD integration with parser
      })
    })

    this.connection.listen(this.port, this.address)
  }

  createClient (socket) {
    console.log(`${socket.name} connected`)
  }

  closeConnection (socket) {
    console.log(`${socket.name} disconnected`)
  }
}

module.exports = Server
