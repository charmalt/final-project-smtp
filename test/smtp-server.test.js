const SMTPServer = require('../lib/smtpServer')
const TCPServer = require('../lib/tcpServer')
jest.mock('../lib/tcpServer')

describe('SMTPServer', () => {
  let server
  let mockServer = {
    init: jest.fn(),
    start: jest.fn()
  }
  let serverInitSpy
  let serverStartSpy

  beforeEach(() => {
    server = new SMTPServer()
    serverInitSpy = jest.spyOn(mockServer, 'init')
    serverStartSpy = jest.spyOn(mockServer, 'start')
    TCPServer.mockImplementation((port, address) => {
      mockServer.init(port, address)
      return mockServer
    })
  })

  describe('default behaviour', () => {
    it('has a port of 1337', () => {
      expect(server.port).toBe(1337)
    })

    it('has a default address of 127.0.0.1', () => {
      expect(server.address).toEqual('127.0.0.1')
    })

    it('creates a TCPServer', () => {
      expect(server.server).toBe(mockServer)
    })

    it('gives the correct port and address to the server', () => {
      expect(serverInitSpy).toHaveBeenCalledWith(server.port, server.address)
    })
  })

  describe('injected constructor', () => {
    let injectedPort, injectedAddress
    beforeEach(() => {
      injectedPort = 5001
      injectedAddress = 'localhost'
      server = new SMTPServer(injectedPort, injectedAddress)
    })

    it('allows a port to be defined', () => {
      expect(server.port).toBe(injectedPort)
    })

    it('allows an address to be defined', () => {
      expect(server.address).toBe(injectedAddress)
    })
  })
})
