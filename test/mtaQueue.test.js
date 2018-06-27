/* global describe, it, expect, beforeEach */
const MTAQueue = require('../lib/mtaQueue')

describe('MTAQueue', () => {
  let queue
  let mailDeliveryAgent = {
    queueNotEmpty: jest.fn()
  }
  let mdaSpy

  beforeEach(() => {
    queue = new MTAQueue(mailDeliveryAgent)
    mdaSpy = jest.spyOn(mailDeliveryAgent, 'queueNotEmpty')
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
    let messageOne = 'Message 1'
    let messageTwo = 'Message 2'

    it('returns whatever is at messages[0]', () => {
      queue.messages = [messageOne]
      expect(queue.takeFromQueue()).toBe(messageOne)
    })

    it('deletes whatever is at messages[0]', () => {
      queue.messages = [messageOne, messageTwo]
      queue.takeFromQueue()
      expect(queue.messages).toEqual([messageTwo])
    })
  })

  describe('_makeNotEmpty', () => {
    it('makes empty false if messages not empty', () => {
      queue._makeNotEmpty()
      expect(queue.empty).toBeFalsy()
    })

    it('Tells the MDA the queue is not empty', () => {
      queue._makeNotEmpty()
      expect(mdaSpy).toHaveBeenCalled()
    })

    it('does nothing if queue already not empty', () => {
      mdaSpy.mockClear()
      queue.empty = false
      queue._makeNotEmpty()
      expect(mdaSpy).not.toHaveBeenCalled()
    })
  })
})
