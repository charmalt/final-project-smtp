const { exec } = require('child_process')
const PostDatabase = require('../models/PostDatabase')


describe('PostDatabase', () => {
  var post
  beforeEach(() => {
    exec('psql -c \'\\c testmailbox\' -c \'TRUNCATE TABLE mail;\'')
    post = new PostDatabase()
  })


  it('does something', () => {
    post.post(123)
  })
})
