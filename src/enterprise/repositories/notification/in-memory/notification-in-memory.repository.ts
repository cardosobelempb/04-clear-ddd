import { NotificationEntity } from '@/enterprise/entities/notfication/notification.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

import { NotificationRepository } from '../notification.repository'

export class NotificationInMemoryRespository implements NotificationRepository {
  public items: NotificationEntity[] = []

  async findById(id: string): Promise<NotificationEntity | null> {
    const notification = this.items.find(item => item.id.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async findMany(params: Pagination.Params): Promise<NotificationEntity[]> {
    throw new Error('Method not implemented.')
  }

  async create(entity: NotificationEntity): Promise<void> {
    this.items.push(entity)
  }

  async update(entity: NotificationEntity): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items[itemIndex] = entity
  }

  async delete(entity: NotificationEntity): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items.splice(itemIndex, 1)
  }
}
