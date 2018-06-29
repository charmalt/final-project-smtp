class MessageDeliveryAgent {
  constructor (dbInterface) {
    this.dbInterface = dbInteface
  }

  queueNotEmpty (queue) {
    while (!queue.isEmpty()) {
      let message = queue.takeFromQueue()
      try {
        this.dbInterface.post(message.mailFrom, message.rcptTo, message.messageBody)
      } catch (error) {
        queue.replaceInQueue(message)
      }
    }
  }
}

module.exports = MessageDeliveryAgent
