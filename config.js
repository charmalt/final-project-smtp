require('dotenv').config()

module.exports = {
  'development': {
    dbConnectionString: 'postgres://localhost:5432/mailbox',
    smtpPort: 1337,
    smtpHost: '127.0.0.1'
  },
  'test': {
    dbConnectionString: 'postgres://localhost:5432/testmailbox',
    smtpPort: 1337,
    smtpHost: '127.0.0.1'
  },
  'production': {
    dbConnectionString: process.env.PGPROD,
    smtpPort: 1337,
    smtpHost: '127.0.0.1'
  }
}
