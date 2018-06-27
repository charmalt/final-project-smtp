const SMTPServer = require('../lib/smtpServer')
const TCPServer = require('../lib/tcpServer')

describe('Feature Test', () => {
  let server
  beforeEach(() => {
    server = new SMTPServer()
    console.log = jest.fn()
  })

  it('SMTP Server registers connection', () => {
    server.start()
    expect(console.log.mock.calls[0][0]).toEqual('Server started')
  })
})
