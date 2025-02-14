import { NotificationInMemoryRespository } from '@/enterprise/repositories/notification/in-memory/notification-in-memory.repository'

import { NotificationSendUseCase } from './notification-send.usecase'

let notificationInMemoryRespository: NotificationInMemoryRespository
let sut: NotificationSendUseCase
describe('NotificationSendUseCase', () => {
  beforeAll(() => {
    notificationInMemoryRespository = new NotificationInMemoryRespository()
    sut = new NotificationSendUseCase(notificationInMemoryRespository)
  })
  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Title notification',
      content: 'content notification',
    })

    expect(result.isRight()).toBe(true)
    expect(notificationInMemoryRespository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
