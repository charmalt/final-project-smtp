
const Database = require('../models/Database')
class MessageDeliveryAgent {
  constructor (database = new Database()) {
    this.database = database
  }
  static _addToDatabase (message) {
    return message
  }

  queueNotEmpty () {
    // while this.empty {
    //   var message = this.takeFromQueue()
    //   database.post(message)
    // }
    // var message =
  }
}

module.exports = MessageDeliveryAgent
