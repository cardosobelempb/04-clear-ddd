import { NotificationEntity, NotificationProps } from '@/enterprise/entities/notfication/notification.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function notificationMake(override: Partial<NotificationProps.Props> = {}, id?: UniqueEntityUUID) {
  const notification = NotificationEntity.create(
    {
      recipientId: new UniqueEntityUUID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification
}
