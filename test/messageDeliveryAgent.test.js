const MessageDeliveryAgent = require('../lib/messageDeliveryAgent.js')

describe('MessageDeliveryAgent', () => {
  let pg = {
    connect: jest.fn()
  }
  let pgSpy = jest.spyOn(pg, 'connect')

  describe('_addToDatabase', () => {
    it('adds a message to the DB', () => {
      let message = 'Random message'
      expect(MessageDeliveryAgent._addToDatabase(message)).toBe(message)
    })
  })
})
