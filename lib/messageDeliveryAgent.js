
const Database = require('../models/Database')
class MessageDeliveryAgent {
  constructor (database = new Database()) {
    this.database = database
  }

  queueNotEmpty (queue) {
    while (!queue.isEmpty()) {
      let message = queue.takeFromQueue()
      try {
        this.database.post(message.mailFrom, message.rcptTo, message.messageBody)
      } catch (error) {
        queue.replaceInQueue(message)
      }
    }
  }
}

module.exports = MessageDeliveryAgent
