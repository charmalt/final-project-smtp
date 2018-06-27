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

  describe('makeNotEmpty', () => {
    it('makes empty true if it was empty', () => {
      queue.makeNotEmpty()
      expect(queue.empty).toBeFalsy()
    })
    it('Tells the MDA the queue is not empty', () => {
      queue.makeNotEmpty()
      expect(mdaSpy).toHaveBeenCalled()
    })
    it('does nothing if queue already not empty', () => {
      mdaSpy.mockClear()
      queue.empty = false
      queue.makeNotEmpty()
      expect(mdaSpy).not.toHaveBeenCalled()
    })
  })
})
