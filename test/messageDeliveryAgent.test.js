const MessageDeliveryAgent = require('../lib/messageDeliveryAgent.js')

describe('MessageDeliveryAgent', () => {
  let mda
  let databaseMock = {post: jest.fn()}
  let databaseSpy
  let queueMock
  let queueSpy
  beforeEach(() => {
    queueMock = { takeFromQueue: jest.fn() }
    queueSpy = jest.spyOn(queueMock, 'takeFromQueue')
      .mockReturnValue({
        mailFrom: 'john',
        rcptTo: 'george',
        messageBody: 'message body'})
    databaseSpy = jest.spyOn(databaseMock, 'post')
    mda = new MessageDeliveryAgent(databaseMock)
    databaseSpy.mockClear()
  })

  describe('queueNotEmpty', () => {
    it('on call takes message out of queue', () => {
      let emptyMock = jest.fn()
      emptyMock
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
      queueMock.isEmpty = emptyMock
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
      let emptyMock = jest.fn()
      emptyMock
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
      queueMock.isEmpty = emptyMock
      mda.queueNotEmpty(queueMock)
      expect(databaseSpy).toHaveBeenCalledWith('john', 'george', 'message body')
    })
  })
})
