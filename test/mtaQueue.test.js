/* global describe, it, expect, beforeEach */
const MTAQueue = require('../lib/mtaQueue')

describe('MTAQueue', () => {
  let queue

  beforeEach(() => {
    queue = new MTAQueue()
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
})
