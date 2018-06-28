const MTAQueue = require('../lib/mtaQueue')

describe('MTAQueue', () => {
  let queue
  let mailDeliveryAgent = {
    queueNotEmpty: jest.fn(),
  }
  let mdaQueueNotEmptySpy
  let messageOne = 'Message 1'
  let messageTwo = 'Message two'

  beforeEach(() => {
    queue = new MTAQueue(mailDeliveryAgent)
    mdaQueueNotEmptySpy = jest.spyOn(mailDeliveryAgent, 'queueNotEmpty')
  })

  it('has an empty messages array', () => {
    expect(queue.messages).toHaveLength(0)
  })

  it('empty is true', () => {
    expect(queue.empty).toBeTruthy()
  })

  describe('addToQueue', () => {
    let message

    beforeEach(() => {
      message = 'Any old string'
      queue.addToQueue(message)
    })

    it('addes message to messages', () => {
      expect(queue.messages).toContain(message)
    })

    it('makes this.empty equal false', () => {
      expect(queue.empty).toBeFalsy()
    })
  })

  describe('takeFromQueue', () => {
    it('returns whatever is at messages[0]', () => {
      queue.messages = [messageOne]
      expect(queue.takeFromQueue()).toBe(messageOne)
    })

    it('deletes whatever is at messages[0]', () => {
      queue.messages = [messageOne, messageTwo]
      queue.takeFromQueue()
      expect(queue.messages).toEqual([messageTwo])
    })

    it('makes this.empty equal true when messages emptied', () => {
      queue.addToQueue(messageOne)
      queue.takeFromQueue()
      expect(queue.empty).toBeTruthy()
    })
  })

  describe('_makeNotEmpty', () => {
    it('makes empty false if messages not empty', () => {
      queue._makeNotEmpty()
      expect(queue.empty).toBeFalsy()
    })

    it('Tells the MDA the queue is not empty', () => {
      queue._makeNotEmpty()
      expect(mdaQueueNotEmptySpy).toHaveBeenCalledWith(queue)
    })

    it('does nothing if queue already not empty', () => {
      mdaQueueNotEmptySpy.mockClear()
      queue.empty = false
      queue._makeNotEmpty()
      expect(mdaQueueNotEmptySpy).not.toHaveBeenCalled()
    })
  })

  describe('_makeEmpty', () => {
    it('makes empty true if messages empty', () => {
      queue.empty = false
      queue._makeEmpty()
      expect(queue.empty).toBeTruthy()
    })
  })

  describe('isEmpty', () => {
    it('returns true', () => {
      expect(queue.isEmpty()).toBeTruthy()
    })

    it('returns false', () => {
      queue.empty = false
      expect(queue.isEmpty()).toBeFalsy()
    })
  })

  describe('replaceInQueue', () => {
    it('replaces a message at the front of the queue', () => {
      queue.addToQueue(messageOne)
      queue.replaceInQueue(messageTwo)
      expect(queue.messages).toEqual([messageTwo, messageOne])
    })

    it('makes this.empty equal false', () => {
      queue.replaceInQueue(messageTwo)
      expect(queue.empty).toBeFalsy()
    })
  })
})
