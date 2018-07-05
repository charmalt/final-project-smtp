const SMTPDbInterface = require('../models/smtpDBInterface')

describe('SMTPDbInterface', () => {
  let smtpDbInterface
  let mockConnection = {
    client: {
      query: jest.fn(() => {
        return new Promise((resolve, reject) => {
          resolve('DATA')
        })
      })
    }
  }
  let mockFailedConnection = {
    client: {
      query: jest.fn(() => {
        return new Promise((resolve, reject) => {
          reject(new Error('FAIL'))
        })
      })
    }
  }
  console.log = jest.fn()

  it('returns the data when response resolves', async () => {
    smtpDbInterface = new SMTPDbInterface(mockConnection)
    let result = await smtpDbInterface.post('word', 'word', 'word')
    expect(result).toEqual('DATA')
  })

  it('returns null if there is an error', async () => {
    smtpDbInterface = new SMTPDbInterface(mockFailedConnection)
    let result = await smtpDbInterface.post('word', 'word', 'word')
    expect(result).toBeFalsy()
  })
})
