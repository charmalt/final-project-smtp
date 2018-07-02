let regExHello = /^(HELO|EHLO)/i
let regExMailFrom = /^MAIL FROM\:/
let regExRCPT = /^RCPT TO\:/
let regExDATA = /^DATA/
let regExEndDATA = /\r\n\.\r\n/
let regExQuit = /^QUIT/

class SmtpClientHandshake {
  constructor (queue) {
    this.responses = {
      ehlo: 250,
      mailFrom: 250,
      rcptTo: 250,
      data: 354,
      endData: 250,
      quit: 221
    }
    this.messageContent = {
      mailFrom: '',
      rcptTo: '',
      messageBody: ''
    }
    this.dataMode = false
    this.queue = queue
  }
  parseMessage (message) {
    console.log('MESSAGE PASSED TO HANDSHAKE:\n', message, '___')
    if (this.dataMode === true) {
      if (message.match(regExEndDATA)) {
        this.messageContent.messageBody += message + '\n'
        this.dataMode = false
        return this.responses['endData']
      }
      this.messageContent.messageBody += message + '\n'
    } else {
      if (message.match(regExHello)) {
        return this.responses['ehlo']
      } else if (message.match(regExMailFrom)) {
        this.messageContent.mailFrom = message.split(':')[1].trim()
        return this.responses['mailFrom']
      } else if (message.match(regExRCPT)) {
        this.messageContent.rcptTo = message.split(':')[1].trim()
        return this.responses['rcptTo']
      } else if (message.match(regExDATA)) {
        this.dataMode = true
        return this.responses['data']
      } else if (message.match(regExQuit)) {
        this.addToQueue()
        return this.responses['quit']
      }
    }
  }

  addToQueue () {
    this.queue.addToQueue(this.messageContent)
  }
}

module.exports = SmtpClientHandshake
