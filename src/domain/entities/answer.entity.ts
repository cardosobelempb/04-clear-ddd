import { Entity } from '../../shared/domain/entities/entity'
import { UniqueEntityUUID } from '../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '../../shared/domain/types/optional'

export namespace AnswerProps {
  export interface Props {
    authorId: UniqueEntityUUID
    questionId: UniqueEntityUUID
    content: string
    createdAt: Date
    updatedAt?: Date
  }
  export interface Id {
    answerId: string
  }
}

export class AnswerEntity extends Entity<AnswerProps.Props> {
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get exerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<AnswerProps.Props, 'createdAt'>,
    id?: UniqueEntityUUID,
  ) {
    const answer = new AnswerEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }
}
