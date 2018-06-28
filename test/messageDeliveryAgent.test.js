const MessageDeliveryAgent = require('../lib/messageDeliveryAgent.js')

describe('MessageDeliveryAgent', () => {
  let mda
  let databaseMock = {post: jest.fn()}
  let databaseErrorMock = { post: jest.fn(() => { throw new Error('Error') }) }
  let queueMock
  let queueSpy
  let emptyMock
  let messageReplaceSpy
  let databaseSpy

  beforeEach(() => {
    queueMock = { takeFromQueue: jest.fn(), replaceInQueue: jest.fn() }
    queueSpy = jest.spyOn(queueMock, 'takeFromQueue')
      .mockReturnValue({
        mailFrom: 'john',
        rcptTo: 'george',
        messageBody: 'message body'})
    messageReplaceSpy = jest.spyOn(queueMock, 'replaceInQueue')
    databaseSpy = jest.spyOn(databaseMock, 'post')
    mda = new MessageDeliveryAgent(databaseMock)
    databaseSpy.mockClear()
    emptyMock = jest.fn()
    emptyMock
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
    queueMock.isEmpty = emptyMock
  })

  describe('queueNotEmpty', () => {
    it('on call takes message out of queue', () => {
      mda.queueNotEmpty(queueMock)
      expect(queueSpy).toHaveBeenCalledTimes(1)
    })

    it('on calls database post method', () => {
      let emptyMock = jest.fn()
      emptyMock
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
      queueMock.isEmpty = emptyMock
      mda.queueNotEmpty(queueMock)
      expect(databaseSpy).toHaveBeenCalledTimes(2)
    })

    it('post arguments are coorect', () => {
      mda.queueNotEmpty(queueMock)
      expect(databaseSpy).toHaveBeenCalledWith('john', 'george', 'message body')
    })

    it('returns message to the queue if unable to put in database', () => {
      let newMDA = new MessageDeliveryAgent(databaseErrorMock)
      newMDA.queueNotEmpty(queueMock)
      expect(messageReplaceSpy).toHaveBeenCalledTimes(1)
    })
  })
})
