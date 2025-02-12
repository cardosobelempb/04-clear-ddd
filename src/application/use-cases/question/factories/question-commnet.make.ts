import {
  QuestionCommentEntity,
  QuestionCommentProps,
} from '@/enterprise/entities/question/question-comment.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function questionCommentMake(
  override: Partial<QuestionCommentProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const questionComment = QuestionCommentEntity.create(
    {
      authorId: new UniqueEntityUUID(),
      questionId: new UniqueEntityUUID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}
