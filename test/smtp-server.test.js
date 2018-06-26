const Server = require('../lib/smtp-server')

describe('Server', () => {
  let server
  let serverPort = 1337
  let serverAddress = '127.0.0.1'

  beforeEach(() => {
    server = new Server(serverPort, serverAddress)
  })

  it('creates an TCP server', () => {
    console.log = jest.fn()
    server.start()
    expect(console.log.mock.calls[0][0]).toBe('Server started')
  })

  it('defines a port', () => {
    expect(server.port).toBe(serverPort)
  })

  it('defines an address', () => {
    expect(server.address).toBe(serverAddress)
  })
})
