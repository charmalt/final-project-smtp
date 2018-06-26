const Server = require('../lib/smtp-server')

describe('Server', () => {
  let server

  beforeEach(() => {
    server = new Server()
  })

  it('creates an TCP server', () => {
    console.log = jest.fn()
    server.start()
    expect(console.log.mock.calls[0][0]).toBe('Server started')
  })
})
