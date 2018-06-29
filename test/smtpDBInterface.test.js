const POPDbInterface = require('../models/smtpDBInterface')

describe('SMTPDbInterface', () => {
  let popDbInterface
  let mockConnection = { query: jest.fn(() => { return new Promise((resolve, reject) => { resolve('DATA') }) }) }
  let mockFailedConnection = { query: jest.fn(() => { return new Promise((resolve, reject) => { reject(new Error('FAIL')) }) }) }

  it('returns the data when response resolves', async () => {
    popDbInterface = new POPDbInterface(mockConnection)
    let result = await popDbInterface.pull()
    expect(result).toEqual('DATA')
  })

  it('returns null if there is an error', async () => {
    popDbInterface = new POPDbInterface(mockFailedConnection)
    let result = await popDbInterface.pull()
    expect(result).toBeFalsy()
  })
})
