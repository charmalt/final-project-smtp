const smtpClientHandshake = require('../lib/smtp_client_handshake_logic')


describe('smtpClientHandshake module', function () {

  it('should respond to \'EHLO\' with 250', function () {
    expect(smtpClientHandshake('EHLO server')).toEqual(250)
  })
  xit('should respond to \'HELO\' with 250', function () {
    expect(smtpClientHandshake('HELO server')).toEqual(250)
  })
  xit('should respond to second \'HELO\' with ERROR', function () {
    expect(smtpClientHandshake('HELO server')).toEqual(250)
    expect(smtpClientHandshake('HELO server')).toEqual(503)
  })
  it('should respond to \'MAIL FROM: at@test.com\' with 250', function () {
    expect(smtpClientHandshake('MAIL FROM: at@test.com')).toEqual(250)
  })
  it('should check if the message follows the correct order', function () {
    
  })
})