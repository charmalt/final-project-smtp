const net = require('net')
const PORT = 1337
const HOST = '127.0.0.1'
const client  = new net.Socket()

client.connect({
  port: PORT,
  host: HOST
})

client.on('connect', function () {
  console.log('STATUS UPDATE: SERVER CONNECTION ESTABLISHED')

  console.log('*** CLIENT STATUS REPORT ***')
  let address = client.address()
  let port = address.port
  let ipAddress = address.address
  console.log('Client is listening on port: ' + port)
  console.log('Client IP Address:' + ipAddress)
  console.log('*** END REPORT ***')

  client.write('Hello, Server!')
})

client.on('data', function (data) {
  console.log('Response received from Server:' + data)
})