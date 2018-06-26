'use strict'

const net = require('net')
const TCPClient = require('./tcpClient')

class Server {
  constructor (port, address) {
    this.port = port
    this.address = address
  }

  start () {
    this.connection = net.createServer((socket) => {
      let client = this.createClient(socket)

      socket.on('data', (data) => {
        // TBD integration with parser
      })

      socket.on('end', () => {
        this.closeConnection(client)
      })
    })

    this.connection.listen(this.port, this.address)
  }

  createClient (socket) {
    let client = new TCPClient(socket)
    console.log(`${client.name} connected`)
    return client
  }

  closeConnection (client) {
    console.log(`${client.name} disconnected`)
  }
}

module.exports = Server
