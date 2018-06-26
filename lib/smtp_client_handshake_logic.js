var regExHello = /^(HELO|EHLO)/i
var regExMailFrom = /^MAIL FROM\:/
var regExRCPT = /^RCPT TO\:/
var regExDATA = /^DATA/
var regExEndDATA = /\r\n\.\r\n/
var regExQuit = /^QUIT/



class SmtpClientHandshake {
  constructor () {
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
  }
  parseMessage (message) {
    if (this.dataMode === true) {
      if (message.match(regExEndDATA)) {
        this.dataMode = false
        return this.responses['endData']
      }
      this.messageContent.messageBody += message + '\n'
    }

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
      return this.responses['quit']
    }
  }
}

module.exports = SmtpClientHandshake
