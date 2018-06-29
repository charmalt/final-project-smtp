const { exec } = require('child_process')
const DBConnection = require('../../models/dbConnection')
const SMTPDbInterface = require('../../models/smtpDBInterface')

describe('Database Connection', () => {
  let connection, smtpInterface

  beforeEach(() => {
    connection = new DBConnection()
    smtpInterface = new SMTPDbInterface(connection.client)
  })

  it('run pull', () => {
    smtpInterface.pull()
  })
})
