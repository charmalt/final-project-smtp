const smtpClientHandshake = require('../lib/smtp_client_handshake_logic')

describe('smtpClientHandshake module', function () {
  it('should respond to \'EHLO\' with 250', function () {
    expect(smtpClientHandshake('EHLO server')).toEqual(250)
  })
  it('should respond to \'HELO\' with 250', function () {
    expect(smtpClientHandshake('HELO server')).toEqual(250)

  })
})