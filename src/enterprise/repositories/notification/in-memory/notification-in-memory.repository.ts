import { NotificationEntity } from '@/enterprise/entities/notfication/notification.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

import { NotificationRepository } from '../notification.repository'

export class NotificationInMemoryRespository implements NotificationRepository {
  public items: NotificationEntity[] = []

  findById(id: string): Promise<NotificationEntity | null> {
    throw new Error('Method not implemented.')
  }

  findMany(params: Pagination.Params): Promise<NotificationEntity[]> {
    throw new Error('Method not implemented.')
  }

  async create(entity: NotificationEntity): Promise<void> {
    this.items.push(entity)
  }

  update(entity: NotificationEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(entity: NotificationEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
