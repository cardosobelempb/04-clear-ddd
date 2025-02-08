import { AnswerEntity, AnswerProps } from '@/enterprise/entities/answer.entity'

import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function answerMake(
  override: Partial<AnswerProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const question = AnswerEntity.create(
    {
      authorId: new UniqueEntityUUID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityUUID(),
      ...override,
    },
    id,
  )

  return question
}
