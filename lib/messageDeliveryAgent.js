
const Database = require('../models/Database')
class MessageDeliveryAgent {
  constructor (database = new Database()) {
    this.database = database
  }
  static _addToDatabase (message) {
    return message
  }

  queueNotEmpty (queue) {
    while (!queue.isEmpty()) {
      let message = queue.takeFromQueue()
      this.database.post(message.mailFrom, message.rcptTo, message.messageBody)
    }
  }
}

module.exports = MessageDeliveryAgent
