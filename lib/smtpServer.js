'use strict'
const TCPServer = require('./tcpServer')
const Handshake = require('./smtpClientHandshakeLogic')
const MTAQueue = require('./mtaQueue')
const DBConnection = require('../models/dbConnection')
const SMTPDBInterface = require('../models/smtpDBInterface')
const MDA = require('./messageDeliveryAgent')

class SMTPServer {
  constructor (port, address) {
    this.port = port || 1337
    this.address = address || '127.0.0.1'
    this.dbConnection = new DBConnection()
    this.database = new SMTPDBInterface(this.dbConnection)
    this.mda = new MDA(this.database)
    this.queue = new MTAQueue(this.mda)
    this.server = new TCPServer(this.port, this.address, Handshake, this.queue)
  }

  start () {
    this.server.start()
  }

  close () {
    this.server.close()
  }
}

module.exports = SMTPServer
