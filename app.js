console.log(process.env)

let SMTPServer = require('./lib/smtpServer')
let serverName = new SMTPServer(process.env.PORT, process.env.EC2_IP)

serverName.start()
