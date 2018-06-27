class MTAQueue {
  constructor (mailDeliveryAgent) {
    this.messages = []
    this.empty = true
    this.mailDeliveryAgent = mailDeliveryAgent
  }

  addToQueue (message) {
    this.messages.push(message)
    this.makeNotEmpty()
  }

  makeNotEmpty () {
    if (this.empty === true) {
      this.empty = false
      this.mailDeliveryAgent.queueNotEmpty()
    }
  }
}

module.exports = MTAQueue
