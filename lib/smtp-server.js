const net = require('net')

const PORT = 1337
const HOST = '127.0.0.1'
const MAX_CONNECTIONS = 10

const server = net.createServer()
server.maxConnections = MAX_CONNECTIONS
server.listen(PORT, HOST)

server.on('close', function () {
  console.log('Server shutdown.')
})

server.on('connection', function (socket) {
  console.log('*** STATUS UPDATE: REMOTE CLIENT ESTABLISHED CONNECTION TO SERVER ***')
  let localPort = socket.localPort
  let localAddress = socket.localAddress
  console.log('Server is listening on local port: ' + localPort)
  console.log('Server\'s local IP Address is:' + localAddress)
  let remoteClientPort = socket.remotePort
  let remoteClientAddress = socket.remoteAddress
  console.log('Remote Client\'s is listening on port: ' + remoteClientPort)
  console.log('Remote Client\'s IP Address:' + remoteClientAddress)
  server.getConnections(function (error, count) {
    console.log('Number of current connections to the server: ' + count)
  })

  console.log('*** END OF STATUS UPDATE ***')

  socket.setTimeout(800000, function () {
    console.log('Socket timed out')
  })


  socket.on('data', function (data) {
    console.log('Remote Client sent the following data: ' + data)
    if (socket.write('SERVER SAYS: ' + data)) {
      console.log('Data was successfully sent to Remote Client.')
    } else {
      socket.pause()
    }
  })

  socket.on('drain', function () {
    socket.resume()
  })

  socket.on('error', function (error) {
    console.log('The following error has occurred: ' + error)
  })

  socket.on('timeout', function () {
    console.log('Remote Client Socket timed out!')
    socket.end('Timed out!')
  })

  socket.on('end', function (data) {
    console.log('Remote Client closed connection with the following: ' + data)
  })

  socket.on('close', function (error) {
    console.log('Socket closed!')
    if (error) {
      console.log('Remote Client Socket closed due to ' + error)
    }
  })

  setTimeout(function () {
    let isdestroyed = socket.destroyed
    console.log('Socket destroyed:' + isdestroyed)
    socket.destroy()
  }, 1200000)
})

server.on('error', function (error) {
  console.log('The following error occurred: ' + error)
})

server.on('listening', function () {
  console.log('*** Welcome to Team Sonar SMTP Server ***')
  let address = server.address()
  let port = address.port
  let ipAddress = address.address
  console.log('Server is listening on port: ' + port)
  console.log('Server IP Address is: ' + ipAddress)
  console.log('*** End of Message ***')
})



let islistening = server.listening

if (islistening) {
  console.log('Server is listening')
} else {
  console.log('Server is not listening')
}
