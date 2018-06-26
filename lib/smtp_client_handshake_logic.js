var regExHello = /^(HELO|EHLO)/i
var regExMailFrom = /^MAIL FROM\:/
var regExRCPT = /^RCPT TO\:/
var regExDATA = /^DATA/
var regExQuit = /^QUIT/


class SmtpClientHandshake {
  constructor () {
    this.responses = {
      ehlo: 250,
      mailFrom: 250,
      rcptTo: 250,
      data: 354
    }
  }
  parseMessage (message) {
    if (message.match(regExHello)) {
      return this.responses['ehlo']
    } else if (message.match(regExMailFrom)) {
      return this.responses['mailFrom']
    } else if (message.match(regExRCPT)) {
      return this.responses['rcptTo']
    } else if (message.match(regExDATA)) {
      return this.responses['data']
    }
  }
}

module.exports = SmtpClientHandshake
