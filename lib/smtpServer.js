'use strict'
const env = process.env.NODE_ENV || 'development'
const config = require('../config')[env]
const pg = require('pg')
const TCPServer = require('./tcpServer')
const Handshake = require('./smtpClientHandshakeLogic')
const MTAQueue = require('./mtaQueue')
const DBConnection = require('../models/dbConnection')
const SMTPDBInterface = require('../models/smtpDBInterface')
const MDA = require('./messageDeliveryAgent')

class SMTPServer {
  constructor (options) {
    let defaults = {
      port: config.popPort,
      host: config.popHost,
      client: new pg.Client(config.dbConnectionString),
      domain: 'test.com'
    }
    let args = Object.assign({}, defaults, options)
    this.port = args['port']
    this.address = args['host']
    this.domain = args['domain']
    this.client = args['client']
    this.dbConnection = new DBConnection(this.client)
    this.database = new SMTPDBInterface(this.dbConnection)
    this.mda = new MDA(this.database)
    this.queue = new MTAQueue(this.mda)
    this.server = new TCPServer(this.port, this.address, this.domain, Handshake, this.queue)
  }

  start () {
    this.server.start()
  }

  close () {
    this.server.close()
  }
}

module.exports = SMTPServer
