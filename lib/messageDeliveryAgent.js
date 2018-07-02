class MessageDeliveryAgent {
  constructor (dbInterface) {
    this.dbInterface = dbInterface
  }

  queueNotEmpty (queue) {
    while (!queue.isEmpty()) {
      let message = queue.takeFromQueue()
      try {
        console.log(message)
        this.dbInterface.post(message.mailFrom, message.rcptTo, message.messageBody)
      } catch (error) {
        queue.replaceInQueue(message)
      }
    }
  }
}

module.exports = MessageDeliveryAgent
