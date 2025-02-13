import {
  AnswerAttachmentEntity,
  AnswerAttachmentProps,
} from '@/enterprise/entities/answer/answer-attachment.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export function answerAttachmentMake(
  override: Partial<AnswerAttachmentProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const answerAttachment = AnswerAttachmentEntity.create(
    {
      attachmentId: new UniqueEntityUUID(),
      answerId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return answerAttachment
}
