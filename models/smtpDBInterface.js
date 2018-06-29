class SMTPDBInterface {
  constructor (connection) {
    this.connection = connection
  }

  async post (mailto, mailfrom, mailbody) {
    let query = await this.connection.client.query(
      `INSERT INTO mail (mailto, mailfrom, mailbody) VALUES('${mailto}', '${mailfrom}', '${mailbody}')`
    )
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(err.stack)
        return false
      })
    return query
  }
}

module.exports = SMTPDBInterface
