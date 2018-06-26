const net = require('net')

class Server {
  constructor (port, address) {
    this.port = port
    this.address = address
  }

  start () {
    this.connection = net.createServer((socket) => {

      socket.on('data', (data) => {
        this.parseData(data)
      })
    })

    this.connection.listen(this.port, this.address)
  }

  parseData (data) {
    return data
  }
}

module.exports = Server
