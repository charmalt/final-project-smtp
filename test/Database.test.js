const { exec } = require('child_process')
const Database = require('../models/Database')

describe('Database Integration', () => {
  var db
  beforeEach(() => {
    exec('psql -c \'\\c testmailbox\' -c \'TRUNCATE TABLE mail;\'')
    db = new Database()
  })

  it('Post method does not throw a error', () => {
    expect(() => { db.post('New Email: no subject') }).not.toThrow()
  })
})
