const SMTPServer = require('../lib/smtpServer')
const TCPServer = require('../lib/tcpServer')
jest.mock('../lib/tcpServer')

describe('SMTPServer', () => {
  let server
  let mockServer = {
    start: jest.fn()
  }

  beforeEach(() => {
    server = new SMTPServer()
    TCPServer.mockImplementation((port, address) => {
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
  })
})
