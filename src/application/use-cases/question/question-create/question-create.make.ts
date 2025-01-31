import {
  QuestionEntity,
  QuestionProps,
} from '@/enterprise/entities/question.entity'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export function questionCreateMake(
  override: Partial<QuestionProps.Props> = {},
) {
  const question = QuestionEntity.create({
    authorId: new UniqueEntityUUID(),
    title: 'Example content',
    slug: Slug.create('example-question'),
    content: 'Example content',
    ...override,
  })

  return question
}
