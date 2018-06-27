class MTAQueue {
  constructor (mailDeliveryAgent) {
    this.messages = []
    this.empty = true
  }
}

module.exports = MTAQueue
