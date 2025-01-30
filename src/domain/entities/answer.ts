import { Entity } from '../../shared/domain/entities/entity'
import { UniqueEnttiyUUID } from '../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '../../shared/domain/types/optional'

export namespace AnswerProps {
  export interface Props {
    authorId: UniqueEnttiyUUID
    questionId: UniqueEnttiyUUID
    content: string
    createdAt: Date
    updatedAt?: Date
  }
  export interface Id {
    answerId: string
  }
}

export class Answer extends Entity<AnswerProps.Props> {
  get content() {
    return this.props.content
  }

  static create(
    props: Optional<AnswerProps.Props, 'createdAt'>,
    id?: UniqueEnttiyUUID,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }
}
