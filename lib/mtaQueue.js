class MTAQueue {
  constructor (mailDeliveryAgent) {
    this.messages = []
    this.empty = true
    this.mailDeliveryAgent = mailDeliveryAgent
  }

  addToQueue (message) {
    this.messages.push(message)
    this._makeNotEmpty()
  }

  takeFromQueue () {
    let message = this.messages[0]
    this.messages.splice(0, 1)
    this._makeEmpty()
    return message
  }

  _makeNotEmpty () {
    if (this.empty === true) {
      this.empty = false
      this.mailDeliveryAgent.queueNotEmpty(this)
    }
  }

  _makeEmpty () {
    if (this.messages.length === 0 && this.empty === false) {
      this.empty = true
    }
  }
}

module.exports = MTAQueue
