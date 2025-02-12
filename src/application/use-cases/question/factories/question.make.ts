import {
  QuestionEntity,
  QuestionProps,
} from '@/enterprise/entities/question/question.entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { faker } from '@faker-js/faker'

export function questionMake(
  override: Partial<QuestionProps.Props> = {},
  id?: UniqueEntityUUID,
) {
  const question = QuestionEntity.create(
    {
      authorId: new UniqueEntityUUID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
