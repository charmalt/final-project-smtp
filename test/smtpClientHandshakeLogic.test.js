/* global describe, it, expect, beforeEach, xit */
const SmtpClientHandshake = require('../lib/smtpClientHandshakeLogic')

describe('smtpClientHandshake module', () => {
  let mockQueue = { addToQueue: jest.fn() }
  let queueSpy
  let smtpClientHandshake

  beforeEach(() => {
    queueSpy = jest.spyOn(mockQueue, 'addToQueue')
    smtpClientHandshake = new SmtpClientHandshake(mockQueue)
    queueSpy.mockClear()
  })

  describe('Initialisation', () => {
    it('should set the dataMode to false on initialisation', () => {
      expect(smtpClientHandshake.dataMode).toBeFalsy()
    })
  })

  describe('Processing of \'HELO\' and \'EHLO\'', () => {
    it('should respond to \'EHLO\' with 250', () => {
      expect(smtpClientHandshake.parseMessage('EHLO server')).toEqual(250)
    })
    it('should respond to \'HELO\' with 250', () => {
      expect(smtpClientHandshake.parseMessage('HELO server')).toEqual(250)
    })
    xit('should respond to second \'HELO\' with ERROR', () => {
      expect(smtpClientHandshake.parseMessage('HELO server')).toEqual(250)
      expect(smtpClientHandshake.parseMessage('DONE server')).toEqual(503)
    })
  })

  describe('Processing of MAIL FROM', () => {
    it('should respond to \'MAIL FROM: at@test.com\' with 250', () => {
      expect(smtpClientHandshake.parseMessage('MAIL FROM: at@test.com')).toEqual(250)
    })
    it('should set messageContent.mailFrom to email address supplied', () => {
      smtpClientHandshake.parseMessage('MAIL FROM: at@test.com')
      expect(smtpClientHandshake.messageContent.mailFrom).toEqual('at@test.com')
    })
  })

  describe('Processing of RCPT TO', () => {
    it('should respond to \'RCPT TO\' with 250', () => {
      expect(smtpClientHandshake.parseMessage('RCPT TO: at@test.com')).toEqual(250)
    })
    it('should set messageContent.rcptTo to email address supplied', () => {
      smtpClientHandshake.parseMessage('RCPT TO: at@test.com')
      expect(smtpClientHandshake.messageContent.rcptTo).toEqual('at@test.com')
    })
  })

  describe('data transfer', () => {
    it('should respond to \'DATA\' with 354', () => {
      expect(smtpClientHandshake.parseMessage('DATA')).toEqual(354)
    })
    it('should respond to \'\r\n.\r\n\' with 250', () => {
      smtpClientHandshake.parseMessage('DATA')
      expect(smtpClientHandshake.parseMessage('\r\n.\r\n')).toEqual(250)
    })
    it('should set the dataMode to true on beginning of DATA', () => {
      smtpClientHandshake.parseMessage('DATA')
      expect(smtpClientHandshake.dataMode).toEqual(true)
    })
    it('should set the dataMode to false on end of DATA', () => {
      smtpClientHandshake.parseMessage('\r\n.\r\n')
      expect(smtpClientHandshake.dataMode).toEqual(false)
    })
    it('appends new lines to messageContent.body if dataMode is true', () => {
      let testString = 'This is a test string.'
      smtpClientHandshake.parseMessage('DATA')
      smtpClientHandshake.parseMessage(testString)
      expect(smtpClientHandshake.messageContent.messageBody).toEqual(testString + '\n')
    })
    it('appends new lines to messageContent.body if dataMode is true', () => {
      let testString = 'This is a test string.'
      smtpClientHandshake.parseMessage('DATA')
      smtpClientHandshake.parseMessage(testString)
      smtpClientHandshake.parseMessage(testString)
      expect(smtpClientHandshake.messageContent.messageBody).toEqual(testString + '\n' + testString + '\n')
    })
  })

  describe('Processing of QUIT', () => {
    it('should respond to \'QUIT\' with 221', () => {
      expect(smtpClientHandshake.parseMessage('QUIT')).toEqual(221)
    })

    it('should add message to queue', () => {
      smtpClientHandshake.parseMessage('QUIT')
      expect(queueSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('addToQueue', () => {
    it('add message to the queue', () => {
      smtpClientHandshake.addToQueue()
      expect(queueSpy).toHaveBeenCalledTimes(1)
    })
  })
})
