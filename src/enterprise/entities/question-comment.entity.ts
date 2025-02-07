import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@/shared/enterprise/types/optional'

export namespace QuestionCommentProps {
  export interface Props {
    authorId: UniqueEntityUUID
    questionId: UniqueEntityUUID
    content: string
    createdAt: Date
    updatedAt?: Date
  }
  export interface Id {
    questionCommentId: string
  }
}

export class QuestionCommentEntity extends Entity<QuestionCommentProps.Props> {
  get authorId() {
    return this.props.authorId
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

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QuestionCommentProps.Props, 'createdAt'>,
    id?: UniqueEntityUUID,
  ) {
    const questionComment = new QuestionCommentEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
