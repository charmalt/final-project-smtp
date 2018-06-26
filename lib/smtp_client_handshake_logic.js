var regExHello = /^(HELO|EHLO)/i
var regExMailFrom = /^MAIL FROM\:/
var regExRCPT = /^RCPT TO\:/
var regExQuit = /^QUIT/

class SmtpClientHandshake {
  constructor () {
    this.responses = {
      ehlo: 250,
      mailFrom: 250,
      rcptTo: 250
    }
  }
  parseMessage (message) {
    if (message.match(regExHello)) {
      return this.responses['ehlo']
    } else if (message.match(regExMailFrom)) {
      return this.responses['mailFrom']
    }
  }
}

module.exports = SmtpClientHandshake
