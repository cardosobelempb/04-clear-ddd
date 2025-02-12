import {
  AnswerCommentEntity,
  AnswerCommentProps,
} from '@/enterprise/entities/answer/answer-comment.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function answerCommentMake(
  override: Partial<AnswerCommentProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const question = AnswerCommentEntity.create(
    {
      authorId: new UniqueEntityUUID(),
      answerId: new UniqueEntityUUID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
