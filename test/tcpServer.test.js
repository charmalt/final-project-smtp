const TCPServer = require('../lib/tcpServer')
const TCPConnectedClient = require('../lib/TCPConnectedClient')
jest.mock('../lib/TCPConnectedClient')
jest.mock('net')

describe('Server', () => {
  let net = require('net')
  let server
  let serverPort = 1337
  let clientPort = 5001
  let serverAddress = '127.0.0.1'
  let clientAddress = '127.0.0.0'
  let mockServer = { listen: () => {} }
  let mockSpy
  let mockSocket = {
    remoteAddress: clientAddress,
    remotePort: clientPort
  }
  let mockClient = {
    address: 'clientAddress',
    port: 2000,
    name: 'name'
  }

  beforeEach(() => {
    server = new TCPServer(serverPort, serverAddress)
    mockSpy = jest.spyOn(mockServer, 'listen')
    net.createServer = () => { return mockServer }
    console.log = jest.fn()
  })

  it('creates an TCP server', () => {
    server.start()
    expect(server.connection).toEqual(mockServer)
  })

  it('defines a port', () => {
    expect(server.port).toBe(serverPort)
  })

  it('defines an address', () => {
    expect(server.address).toBe(serverAddress)
  })

  it('tells the connection to listen on set port and address', () => {
    server.start()
    expect(mockSpy).toHaveBeenCalledWith(serverPort, serverAddress)
  })

  describe('createClient', () => {
    beforeEach(() => {
      TCPConnectedClient.mockImplementation((socket) => {
        return mockClient
      })
    })

    it('logs the new client connection', () => {
      server.createClient(mockSocket)
      expect(console.log.mock.calls[0][0]).toBe(`${mockClient.name} connected`)
    })

    it('returns the Client instance', () => {
      expect(server.createClient(mockSocket)).toBe(mockClient)
    })
  })
  describe('closeConnection', () => {
    it('logs the closed connection', () => {
      server.closeConnection(mockSocket)
      expect(console.log.mock.calls[0][0]).toBe(`${mockSocket.name} disconnected`)
    })
  })
})
