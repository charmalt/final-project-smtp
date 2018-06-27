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
})
