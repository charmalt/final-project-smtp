const Server = require('../lib/smtp-server')
jest.mock('net')

describe('Server', () => {
  let net = require('net')
  let server
  let serverPort = 1337
  let serverAddress = '127.0.0.1'
  let mockServer = { listen: () => {} }
  let mockSpy
  let data = "String"

  beforeEach(() => {
    server = new Server(serverPort, serverAddress)
    mockSpy = spyOn(mockServer, 'listen')
    net.createServer = () => { return mockServer }
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

  describe('parseData', () => {
    it('formats data correctly', () => {
      expect(server.parseData(data)).toEqual(data)
    })
  })

})
