import { NotificationInMemoryRespository } from '@/enterprise/repositories/notification/in-memory/notification-in-memory.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { notificationMake } from '../factories/notification.factory'
import { NotificationReadUseCase } from './notification-read.usecase'

let notificationInMemoryRespository: NotificationInMemoryRespository
let sut: NotificationReadUseCase

describe('NotificationReadUseCase', () => {
  beforeAll(() => {
    notificationInMemoryRespository = new NotificationInMemoryRespository()
    sut = new NotificationReadUseCase(notificationInMemoryRespository)
  })
  it('should be able to read a notification', async () => {
    const notification = notificationMake()

    notificationInMemoryRespository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(notificationInMemoryRespository.items[0].readAt).toEqual(expect.any(Date))
  })

  it('should not be able to read a notification from author user', async () => {
    const notification = notificationMake({ recipientId: new UniqueEntityUUID('recepient-1') })

    await notificationInMemoryRespository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recepient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedErro)
  })
})
