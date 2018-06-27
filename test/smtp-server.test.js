const SMTPServer = require('../lib/smtpServer')

describe('SMTPServer', () => {
  let server

  beforeEach(() => {
    server = new SMTPServer()
  })

  describe('default behaviour', () => {
    it('has a port of 1337', () => {
      expect(server.port).toEqual(1337)
    })

    it('has a default address of 127.0.0.1', () => {
      expect(server.address).toEqual('127.0.0.1')
    })
  })
})
