class SMTPDbInterface {
  constructor (connection) {
    this.connection = connection
  }

  pull () {
    return this.connection.query(`select * from mail`, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    })
  }
}

module.exports = SMTPDbInterface
