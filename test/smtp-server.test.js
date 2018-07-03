const SMTPServer = require('../lib/smtpServer')
const TCPServer = require('../lib/tcpServer')
const MTAQueue = require('../lib/mtaQueue')
const Handshake = require('../lib/smtpClientHandshakeLogic')
const DBConnection = require('../models/dbConnection')
const DBInterface = require('../models/smtpDBInterface')
const MDA = require('../lib/messageDeliveryAgent')

jest.mock('../lib/tcpServer')
jest.mock('../lib/mtaQueue')
jest.mock('../models/dbConnection')
jest.mock('../models/smtpDBInterface')
jest.mock('../lib/messageDeliveryAgent')

describe('SMTPServer', () => {
  let server
  let mockServer = {
    init: jest.fn(),
    start: jest.fn(),
    close: jest.fn()
  }
  let serverInitSpy
  let serverStartSpy
  let serverCloseSpy
  let dbConnectionSpy
  let dbInterfaceSpy
  let mdaSpy
  let queueSpy
  let mockQueue = {
    init: jest.fn()
  }
  let mockMDA = {
    init: jest.fn()
  }
  let mockDBConnection = {
    init: jest.fn()
  }
  let mockDBInterface = {
    init: jest.fn()
  }

  beforeEach(() => {
    server = new SMTPServer()
    serverInitSpy = jest.spyOn(mockServer, 'init')
    serverStartSpy = jest.spyOn(mockServer, 'start')
    serverCloseSpy = jest.spyOn(mockServer, 'close')
    dbConnectionSpy = jest.spyOn(mockDBConnection, 'init')
    dbInterfaceSpy = jest.spyOn(mockDBInterface, 'init')
    mdaSpy = jest.spyOn(mockMDA, 'init')
    queueSpy = jest.spyOn(mockQueue, 'init')

    TCPServer.mockImplementation((port, address, domain, handshake, queue) => {
      mockServer.init(port, address, domain, handshake, queue)
      return mockServer
    })
    MTAQueue.mockImplementation((mockMDA) => {
      mockQueue.init(mockMDA)
      return mockQueue
    })
    DBConnection.mockImplementation((client) => {
      mockDBConnection.init(client)
      return mockDBConnection
    })
    DBInterface.mockImplementation((dbConnection) => {
      mockDBInterface.init(dbConnection)
      return mockDBInterface
    })
    MDA.mockImplementation((dbInterface) => {
      mockMDA.init(dbInterface)
      return mockMDA
    })
  })

  describe('default behaviour', () => {
    it('has a port of 1337', () => {
      expect(server.port).toBe(1337)
    })

    it('has a default address of 127.0.0.1', () => {
      expect(server.address).toEqual('127.0.0.1')
    })

    it('has a default domain of test.com', () => {
      expect(server.domain).toEqual('test.com')
    })

    it('creates a TCPServer', () => {
      expect(server.server).toBe(mockServer)
    })

    it('creates a MTAQueue', () => {
      expect(server.queue).toBe(mockQueue)
    })

    it('gives the correct port, address and domain to the server', () => {
      expect(serverInitSpy).toHaveBeenCalledWith(server.port, server.address, server.domain, Handshake, mockQueue)
    })
  })

  describe('injected constructor', () => {
    let injectedPort, injectedAddress, injectedDomain, injectedClient
    beforeEach(() => {
      injectedPort = 5001
      injectedAddress = 'localhost'
      injectedDomain = 'react.com'
      injectedClient = 'client'
      server = new SMTPServer(injectedPort, injectedAddress, injectedDomain, injectedClient)
    })

    it('allows a port to be defined', () => {
      expect(server.port).toBe(injectedPort)
    })

    it('allows an address to be defined', () => {
      expect(server.address).toBe(injectedAddress)
    })


    it('allows a domain to be defined', () => {
      expect(server.domain).toBe(injectedDomain)
    })
    
    it('passes the client to dbConnection', () => {
      expect(dbConnectionSpy).toHaveBeenCalledWith(injectedClient)
    })

    it('passes the dbConnection to dbInterface', () => {
      expect(dbInterfaceSpy).toHaveBeenCalledWith(mockDBConnection)
    })

    it('passes the dbInterface to mda', () => {
      expect(mdaSpy).toHaveBeenCalledWith(mockDBInterface)
    })

    it('passes the mda to queue', () => {
      expect(queueSpy).toHaveBeenCalledWith(mockMDA)
    })
  })

  describe('starts tcpServer', () => {
    it('calls start method on tcpServer', () => {
      server.start()
      expect(serverStartSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('close', () => {
    it('calls close method on tcpServer', () => {
      server.close()
      expect(serverCloseSpy).toHaveBeenCalledTimes(1)
    })
  })
})
