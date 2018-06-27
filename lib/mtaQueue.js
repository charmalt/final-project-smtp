class MTAQueue {
  constructor () {
    this.messages = []
    this.empty = true
  }

  addToQueue (message) {
    this.messages.push(message)
    this.makeNotEmpty()
  }

}

module.exports = MTAQueue
