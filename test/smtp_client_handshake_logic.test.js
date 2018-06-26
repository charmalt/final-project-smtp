/* global describe, it, expect, beforeEach, xit */
const SmtpClientHandshake = require('../lib/smtp_client_handshake_logic')



describe('smtpClientHandshake module', function () {

  beforeEach(function () {
    smtpClientHandshake = new SmtpClientHandshake
  })

  describe('Initialisation', function () {
    it('should set the dataMode to false on initialisation', function () {
      expect(smtpClientHandshake.dataMode).toBeFalsy
    })
  })

  describe('Processing of \'HELO\' and \'EHLO\'', function () {
    it('should respond to \'EHLO\' with 250', function () {
      expect(smtpClientHandshake.parseMessage('EHLO server')).toEqual(250)
    })
    it('should respond to \'HELO\' with 250', function () {
      expect(smtpClientHandshake.parseMessage('HELO server')).toEqual(250)
    })
    xit('should respond to second \'HELO\' with ERROR', function () {
      expect(smtpClientHandshake.parseMessage('HELO server')).toEqual(250)
      expect(smtpClientHandshake.parseMessage('HELO server')).toEqual(503)
    })
  })

  describe('Processing of MAIL FROM', function () {
    it('should respond to \'MAIL FROM: at@test.com\' with 250', function () {
      expect(smtpClientHandshake.parseMessage('MAIL FROM: at@test.com')).toEqual(250)
    })
  })

  describe('Processing of RCPT TO', function () {
    it('should respond to \'RCPT TO\' with 250', function () {
      expect(smtpClientHandshake.parseMessage('RCPT TO: at@test.com')).toEqual(250)
    })
  })

  describe('data transfer', function () {
    it('should respond to \'DATA\' with 354', function () {
      expect(smtpClientHandshake.parseMessage('DATA')).toEqual(354)
    })
    it('should respond to \'\r\n.\r\n\' with 250', function () {
      expect(smtpClientHandshake.parseMessage('\r\n.\r\n')).toEqual(250)
    })
    it('should set the dataMode to true on beginning of DATA', function () {
      smtpClientHandshake.parseMessage('DATA')
      expect(smtpClientHandshake.dataMode).toBeTruthy
    })
    it('should set the dataMode to false on end of DATA', function () {
      smtpClientHandshake.parseMessage('\r\n.\r\n')
      expect(smtpClientHandshake.dataMode).toBeFalsy
    })
  })

  describe('Processing of QUIT', function () {
    it('should respond to \'QUIT\' with 221', function () {
      expect(smtpClientHandshake.parseMessage('QUIT')).toEqual(221)
    })
  })
})

