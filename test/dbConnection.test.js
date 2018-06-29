const DBConnection = require('../models/dbConnection')

describe('DBConnection', () => {
  let dbConnection
  let mockClient
  let clientSpy

  beforeEach(() => {
    mockClient = { connect: jest.fn() }
    clientSpy = jest.spyOn(mockClient, 'connect')
    dbConnection = new DBConnection(mockClient)
  })

  it('creates a new connection', () => {
    expect(clientSpy).toHaveBeenCalledTimes(1)
  })
})
