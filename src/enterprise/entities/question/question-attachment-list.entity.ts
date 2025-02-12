import { WatchedList } from '@/shared/enterprise/entities/watched-list/watched-list'
import { QuestionAttachmentEntity } from './question-attachment.entity'

export class QuestionAttachmentListEntity extends WatchedList<QuestionAttachmentEntity> {
  compareItems(
    a: QuestionAttachmentEntity,
    b: QuestionAttachmentEntity,
  ): boolean {
    return a.attachmentId === b.attachmentId
  }
}
