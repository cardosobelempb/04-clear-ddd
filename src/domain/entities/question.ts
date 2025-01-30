import { Entity } from '../../shared/domain/entities/entity'
import { Slug } from '../../shared/domain/entities/value-objects/slug/slug'
import { UniqueEnttiyUUID } from '../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '../../shared/domain/types/optional'

export namespace QuestionProps {
  export interface Props {
    authorId: UniqueEnttiyUUID
    bestAnswerId?: UniqueEnttiyUUID
    title: string
    content: string
    slug: Slug
    createdAt: Date
    updatedAt?: Date
  }

  export interface Id {
    questionId: UniqueEnttiyUUID
  }
}

export class Question extends Entity<QuestionProps.Props> {
  static create(
    props: Optional<QuestionProps.Props, 'createdAt'>,
    id?: UniqueEnttiyUUID,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
