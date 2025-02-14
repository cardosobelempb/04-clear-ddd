import { NotificationEntity } from '@/enterprise/entities/notfication/notification.entity'
import { NotificationRepository } from '@/enterprise/repositories/notification/notification.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/handle-erros/either'

export namespace Props {
  export interface Request {
    recipientId: string
    title: string
    content: string
  }

  export type Response = Either<
    null,
    {
      notification: NotificationEntity
    }
  >
}

export class NotificationSendUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    recipientId,
    title,
    content,
  }: Props.Request): Promise<Props.Response> {
    const notification = NotificationEntity.create({
      recipientId: new UniqueEntityUUID(recipientId),
      title,
      content,
    })

    await this.notificationRepository.create(notification)
    return right({ notification })
  }
}
