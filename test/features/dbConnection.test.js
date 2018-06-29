const { exec } = require('child_process')
const DBConnection = require('../../models/dbConnection')
const SMTPDbInterface = require('../../models/smtpDBInterface')

describe('Database Connection', () => {
  let connection, smtpInterface

  beforeEach(() => {
    exec('psql -c \'\\c testmailbox\' -c \'TRUNCATE TABLE mail;\'')
    connection = new DBConnection()
    smtpInterface = new SMTPDbInterface(connection)
  })

  it('add to database', async () => {
    await expect(smtpInterface.post('mailto', 'mailfrom', 'mailbody'))

  })
})
