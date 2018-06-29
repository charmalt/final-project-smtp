class SMTPDbInterface {
  constructor (connection) {
    this.connection = connection
  }

  async post (mailto, mailfrom, mailbody) {
    await this.connection.client.query(`INSERT INTO mail (mailto, mailfrom, mailbody) VALUES('${mailto}', '${mailfrom}', '${mailbody}')`)
  }
}

module.exports = SMTPDbInterface
