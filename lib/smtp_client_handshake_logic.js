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
    this.dataMode = false
  }
  parseMessage (message) {
    if (message.match(regExHello)) {
      return this.responses['ehlo']
    } else if (message.match(regExMailFrom)) {
      return this.responses['mailFrom']
    } else if (message.match(regExRCPT)) {
      return this.responses['rcptTo']
    } else if (message.match(regExDATA)) {
      this.dataMode = true
      return this.responses['data']
    } else if (message.match(regExEndDATA)) {
      this.dataMode = false
      return this.responses['endData']
    } else if (message.match(regExQuit)) {
      return this.responses['quit']
    }
  }
}

module.exports = SmtpClientHandshake
