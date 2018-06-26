const TCPClient = require('../lib/tcpClient.js')

describe('TCPClient', () => {
  let client
  let clientPort = 5001
  let clientAddress = '127.0.0.0'
  let mockSocket = {
    remoteAddress: clientAddress,
    remotePort: clientPort,
    name: `${clientAddress}:${clientPort}`
  }

  beforeEach(() => {
    client = new TCPClient(mockSocket)
  })

  it('stores the address', () => {
    expect(client.address).toBe(clientAddress)
  })

  it('stores the port', () => {
    expect(client.port).toBe(clientPort)
  })

  it('creates the name', () => {
    expect(client.name).toBe(`${clientAddress}:${clientPort}`)
  })
})
