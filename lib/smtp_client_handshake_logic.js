const responses = {
  ehlo: 250
}

var regExHello = /^(HELO|EHLO)/i
var regExMailFrom = /^MAIL FROM\:/
var regExQuit = /^QUIT/

//TODO:
// 1. Validate correct order of converstaion
//2.

function smtpClientHandshake (message) {
  if (message.match(/^(HELO|EHLO)/i)) {
    return responses['ehlo']
  }
}

module.exports = smtpClientHandshake