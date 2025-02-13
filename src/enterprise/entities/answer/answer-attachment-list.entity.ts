import { WatchedList } from '@/shared/enterprise/entities/watched-list/watched-list'

import { AnswerAttachmentEntity } from './answer-attachment.entity'

export class AnswerAttachmentListEntity extends WatchedList<AnswerAttachmentEntity> {
  compareItems(a: AnswerAttachmentEntity, b: AnswerAttachmentEntity): boolean {
    return a.attachmentId === b.attachmentId
  }
}
