const SMTPServer = require('../lib/smtpServer')
const TCPServer = require('../lib/tcpServer')
const MTAQueue = require('../lib/mtaQueue')
const Handshake = require('../lib/smtpClientHandshakeLogic')
jest.mock('../lib/tcpServer')
jest.mock('../lib/mtaQueue')

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
  let mockQueue = {
    init: jest.fn()
  }

  beforeEach(() => {
    server = new SMTPServer()
    serverInitSpy = jest.spyOn(mockServer, 'init')
    serverStartSpy = jest.spyOn(mockServer, 'start')
    serverCloseSpy = jest.spyOn(mockServer, 'close')
    TCPServer.mockImplementation((port, address, domain, handshake, queue) => {
      mockServer.init(port, address, domain, handshake, queue)
      return mockServer
    })
    MTAQueue.mockImplementation(() => {
      return mockQueue
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
    let injectedPort, injectedAddress, injectedDomain
    beforeEach(() => {
      injectedPort = 5001
      injectedAddress = 'localhost'
      injectedDomain = 'react.com'
      server = new SMTPServer(injectedPort, injectedAddress, injectedDomain)
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
