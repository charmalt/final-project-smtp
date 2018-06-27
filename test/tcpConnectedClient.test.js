const TCPConnectedClient = require('../lib/TCPConnectedClient.js')

describe('TCPClient', () => {
  let client
  let clientPort = 5001
  let clientAddress = '127.0.0.0'
  let mockSocket = {
    remoteAddress: clientAddress,
    remotePort: clientPort,
    name: `${clientAddress}:${clientPort}`,
    write: jest.fn(),
    destroy: jest.fn()
  }
  let mockMessage = 'Test String'
  let mockHandshake = {
    parseMessage: jest.fn(() => 250),
    responses: { quit: 221 }
  }
  let mockWrite
  let mockDestroy

  beforeEach(() => {
    client = new TCPConnectedClient(mockSocket, mockHandshake)
    mockWrite = jest.spyOn(mockSocket, 'write')
    mockDestroy = jest.spyOn(mockSocket, 'destroy')
    mockDestroy.mockClear()
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

  it('stores the whole socket', () => {
    expect(client.socket).toBe(mockSocket)
  })

  describe('receiveMessage', () => {
    it('writes a message to the socket', () => {
      client.receiveMessage(mockMessage)
      expect(mockWrite).toHaveBeenCalledWith(mockMessage)
    })
  })

  describe('executeHandshake', () => {
    it('parses message', () => {
      let spyHandshake = jest.spyOn(mockHandshake, 'parseMessage')
      client.parseMessage(mockMessage)
      expect(spyHandshake).toHaveBeenCalledWith(mockMessage)
    })
  })

  describe('closeConnection', () => {
    it('destroys the socket connection', () => {
      client.closeConnection()
      expect(mockDestroy).toHaveBeenCalledTimes(1)
    })
  })

  describe('handleResponse', () => {
    const response = 250
    const quitResponse = 221
    it('sends response back to client', () => {
      client.handleResponse(response)
      expect(mockWrite).toHaveBeenCalledWith(response.toString())
    })

    it('closes connection on 221 response', () => {
      client.handleResponse(quitResponse)
      expect(mockDestroy).toHaveBeenCalledTimes(1)
    })

    it('keeps connection open when not a 221 reponse', () => {
      client.handleResponse(response)
      expect(mockDestroy).toHaveBeenCalledTimes(0)
    })
  })
})
