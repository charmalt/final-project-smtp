/* global describe, it, expect, beforeEach, xit */
const SmtpClientHandshake = require('../lib/smtpClientHandshakeLogic')

describe('smtpClientHandshake module', () => {
  let mockQueue = { addToQueue: jest.fn() }
  let queueSpy
  let smtpClientHandshake
  let domain = 'test.com'
  let rcptToInternal = 'test@test.com'
  let rcptToExternal = 'test@another.com'

  beforeEach(() => {
    queueSpy = jest.spyOn(mockQueue, 'addToQueue')
    smtpClientHandshake = new SmtpClientHandshake(mockQueue, domain)
    queueSpy.mockClear()
  })

  describe('Initialisation', () => {
    it('should set the dataMode to false on initialisation', () => {
      expect(smtpClientHandshake.dataMode).toBeFalsy()
    })

    it('should have domain set on initialisation', () => {
      expect(smtpClientHandshake.domain).toBe(domain)
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
      smtpClientHandshake.messageContent.rcptTo = rcptToInternal
      smtpClientHandshake.parseMessage('QUIT')
      expect(queueSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('addToQueue', () => {
    it('should run the checkDomain method', () => {
      let domainSpy = jest.spyOn(smtpClientHandshake, '_checkDomain')
      smtpClientHandshake.addToQueue()
      expect(domainSpy).toHaveBeenCalledTimes(1)
    })

    it('should only add message to queue if checkDomain method returns true', () => {
      smtpClientHandshake.messageContent.rcptTo = rcptToInternal
      smtpClientHandshake.addToQueue()
      expect(queueSpy).toHaveBeenCalledTimes(1)
    })

    it('should not add to queue if checkDomain method returns false', () => {
      smtpClientHandshake.messageContent.rcptTo = rcptToExternal
      smtpClientHandshake.addToQueue()
      expect(queueSpy).toHaveBeenCalledTimes(0)
    })

    it('add message to the queue', () => {
      smtpClientHandshake.messageContent.rcptTo = rcptToInternal
      smtpClientHandshake.addToQueue()
      expect(queueSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('_checkDomain', () => {
    it('should call _extractDomainFromReceiverAddress', () => {
      let domainNameExtractorSpy = jest.spyOn(smtpClientHandshake, '_extractDomainFromReceiverAddress')
      smtpClientHandshake._checkDomain(rcptToInternal)
      expect(domainNameExtractorSpy).toHaveBeenCalledTimes(1)
    })

    it('should return true if rcptTo domain is the same as specified domain', () => {
      smtpClientHandshake.messageContent.rcptTo = rcptToInternal
      expect(smtpClientHandshake._checkDomain(smtpClientHandshake.messageContent.rcptTo)).toEqual(true)
    })

    it('should return false if rcptTo domain is not the same as specified domain', () => {
      smtpClientHandshake.messageContent.rcptTo = rcptToExternal
      expect(smtpClientHandshake._checkDomain(smtpClientHandshake.messageContent.rcptTo)).toEqual(false)
    })
  })

  describe('_extractDomainFromReceiverAddress', () => {
    let emailAddress = 'test@test.com'
    it('should return the domain name from the email address', () => {
      expect(smtpClientHandshake._extractDomainFromReceiverAddress(emailAddress)).toEqual('test.com')
    })
  })

  describe('_processMessageBody', () => {
    it('should separate message at terminating dot and return the part of the message preceeding the dot', () => {
      smtpClientHandshake.messageContent.messageBody = 'Test and test \r\n.\r\n'
      smtpClientHandshake._processMessageBody()
      expect(smtpClientHandshake.messageContent.messageBody).toEqual('Test and test ')
    })
  })
})
