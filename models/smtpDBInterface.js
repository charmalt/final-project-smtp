class SMTPDbInterface {
  constructor (connection) {
    this.connection = connection
  }

  pull () {
    return this.connection.query(`select * from mail`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(err.stack)
        return false
      })
  }
}

module.exports = SMTPDbInterface
