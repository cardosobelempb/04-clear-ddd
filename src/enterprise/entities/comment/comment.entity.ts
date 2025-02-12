import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace CommentProps {
  export interface Props {
    authorId: UniqueEntityUUID
    content: string
    createdAt: Date
    updatedAt?: Date
  }
  export interface Id {
    commentId: string
  }
}

export abstract class CommentEntity<
  Props extends CommentProps.Props,
> extends Entity<Props> {
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
}
