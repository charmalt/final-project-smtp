const Server = require('../lib/smtp-server')
jest.mock('net')

describe('Server', () => {
  let net = require('net')
  let server
  let serverPort = 1337
  let serverAddress = '127.0.0.1'

  beforeEach(() => {
    server = new Server(serverPort, serverAddress)
    net.createServer = () => { return 'Server'}
  })

  it('creates an TCP server', () => {
    server.start()
    expect(server.server).toEqual('Server')
  })

  it('defines a port', () => {
    expect(server.port).toBe(serverPort)
  })

  it('defines an address', () => {
    expect(server.address).toBe(serverAddress)
  })
})
