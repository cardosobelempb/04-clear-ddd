import {
  QuestionAttachmentEntity,
  QuestionAttachmentProps,
} from '@/enterprise/entities/question/question-attachment.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function questionAttachmentMake(
  override: Partial<QuestionAttachmentProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const questionAttachment = QuestionAttachmentEntity.create(
    {
      attachmentId: new UniqueEntityUUID(),
      questionId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return questionAttachment
}
