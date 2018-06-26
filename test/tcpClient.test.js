const Client = require('../tcpClient.js')

describe('Client', () => {
  let client
  let clientPort = 5001
  let clientAddress = '127.0.0.0'
  let mockSocket = {
    remoteAddress: clientAddress,
    port: clientPort,
    name: `${clientPort}:${clientAddress}`
  }

  beforeEach(() => {
    client = new Client(mockSocket)
  })

  it('stores the address', () => {
    expect(client.address).toBe(clientAddress)
  })
})
