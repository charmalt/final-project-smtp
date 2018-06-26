const Server = require('../lib/smtp-server')

describe('Server', () => {
  let server
  let serverPort = 1337

  beforeEach(() => {
    server = new Server(serverPort)
  })

  it('creates an TCP server', () => {
    console.log = jest.fn()
    server.start()
    expect(console.log.mock.calls[0][0]).toBe('Server started')
  })

  it('defines a port', () => {
    expect(server.port).toBe(serverPort)
  })
})
