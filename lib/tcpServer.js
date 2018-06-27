'use strict'

const net = require('net')
const TCPConnectedClient = require('./TCPConnectedClient')

class TCPServer {
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
    console.log('Server started')
  }

  createClient (socket) {
    let client = new TCPConnectedClient(socket)
    console.log(`${client.name} connected`)
    return client
  }

  closeConnection (client) {
    console.log(`${client.name} disconnected`)
  }

  close () {
    this.connection.close()
    console.log('Server closed')
  }
}

module.exports = TCPServer
