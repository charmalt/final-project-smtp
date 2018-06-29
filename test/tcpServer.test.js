const TCPServer = require('../lib/tcpServer')
const TCPConnectedClient = require('../lib/tcpConnectedClient')
jest.mock('../lib/tcpConnectedClient')
jest.mock('net')

describe('Server', () => {
  let net = require('net')
  let server
  let serverPort = 1337
  let clientPort = 5001
  let serverAddress = '127.0.0.1'
  let clientAddress = '127.0.0.0'
  let mockServer = {
    listen: () => {},
    close: () => {}
  }
  let mockSpy
  let serverCloseSpy
  let mockSocket = {
    remoteAddress: clientAddress,
    remotePort: clientPort
  }
  let mockSocket2 = {
    destroy: () => {}
  }
  let mockClient = {
    address: 'clientAddress',
    port: 2000,
    name: 'name',
    socket: mockSocket2,
    closeConnection: jest.fn(),
    parseMessage: jest.fn()
  }
  let mockQueue = {}
  class MockHandshakeConstructor {}

  beforeEach(() => {
    server = new TCPServer(serverPort, serverAddress, MockHandshakeConstructor, mockQueue)
    mockSpy = jest.spyOn(mockServer, 'listen')
    serverCloseSpy = jest.spyOn(mockServer, 'close')
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

    it('stores client in array', () => {
      server.createClient(mockSocket)
      expect(server.clients).toContain(mockClient)
    })
  })

  describe('closeConnection', () => {
    it('logs the closed connection', () => {
      server.closeConnection(mockClient)
      expect(console.log.mock.calls[0][0]).toBe(`${mockClient.name} disconnected`)
    })
  })

  describe('_handleSocketData', () => {
    it('calls socket.on', () => {
      let mockSocket3 = {
        on: jest.fn()
      }
      let spyMockSocket3 = jest.spyOn(mockSocket3, 'on')
      server._handleSocketData(mockSocket3)
      expect(spyMockSocket3).toHaveBeenCalled()
    })
  })

  describe('_handleSocketEnd', () => {
    it('calls socket.on', () => {
      let mockSocket4 = {
        on: jest.fn()
      }
      let spyMockSocket4 = jest.spyOn(mockSocket4, 'on')
      server._handleSocketData(mockSocket4)
      expect(spyMockSocket4).toHaveBeenCalled()
    })
  })

  describe('closeServer', () => {
    let socketDestroySpy
    beforeEach(() => {
      socketDestroySpy = jest.spyOn(mockClient, 'closeConnection')
    })
    it('closes server connection', () => {
      server.start()
      server.close()
      expect(serverCloseSpy).toHaveBeenCalledTimes(1)
    })

    it('Logs the closed connection', () => {
      server.start()
      server.close()
      expect(console.log.mock.calls[1][0]).toBe('Server closed')
    })

    it('destroys socket connection', () => {
      server.start()
      server.createClient(mockSocket)
      server.close()
      expect(socketDestroySpy).toHaveBeenCalledTimes(1)
    })

    it('logs the closed connection', () => {
      server.start()
      server.createClient(mockSocket)
      server.close()
      expect(server.clients).toHaveLength(0)
    })
  })

  describe('handleData', () => {
    let data = 1234
    it('Console logs the data string', () => {
      server.handleData(mockClient, data)
      expect(console.log.mock.calls[0][0]).toBe(data.toString())
    })

    it('Tells the client to parse the message', () => {
      let spyClientParse = jest.spyOn(mockClient, 'parseMessage')
      server.handleData(mockClient, data)
      expect(spyClientParse).toHaveBeenCalledWith(data.toString())
    })
  })
})
