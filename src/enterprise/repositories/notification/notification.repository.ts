import { NotificationEntity } from '@/enterprise/entities/notfication/notification.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class NotificationRepository extends RepositoryAbstract<NotificationEntity> {}
