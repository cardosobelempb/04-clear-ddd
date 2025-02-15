import { NotificationEntity } from '@/enterprise/entities/notfication/notification.entity'
import { NotificationRepository } from '@/enterprise/repositories/notification/notification.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace Props {
  export interface Request {
    recipientId: string
    notificationId: string
  }

  export type Response = Either<
    ResourceNotFoundErro | NotAllowedErro,
    {
      notification: NotificationEntity
    }
  >
}

export class NotificationReadUseCase {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute({ recipientId, notificationId }: Props.Request): Promise<Props.Response> {
    const notification = await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundErro())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedErro())
    }

    notification.read()

    await this.notificationRepository.update(notification)
    return right({ notification })
  }
}
