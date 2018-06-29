const SMTPServer = require('../../lib/smtpServer')

describe('Feature Test', () => {
  let server
  beforeEach(() => {
    server = new SMTPServer()
    console.log = jest.fn()
    server.start()
  })

  afterAll(() => {
    server.close()
  })

  it('SMTP Server registers connection', () => {
    expect(console.log.mock.calls[0][0]).toEqual('Server started')
  })
})
