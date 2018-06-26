const responses = {
  ehlo: 250,
  mailFrom: 250,
  rcptTo: 250
}

var regExHello = /^(HELO|EHLO)/i
var regExMailFrom = /^MAIL FROM\:/
var regExRCPT = /^RCPT TO\:/
var regExQuit = /^QUIT/

function smtpClientHandshake (message) {
  if (message.match(regExHello)) {
    return responses['ehlo']
   }
  } else if (message.match(regExMailFrom)) {
    return responses['mailFrom']
  }
}

module.exports = smtpClientHandshake
