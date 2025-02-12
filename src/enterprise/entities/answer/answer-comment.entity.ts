import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@/shared/enterprise/types/optional'

import { CommentEntity, CommentProps } from '../comment/comment.entity'

export namespace AnswerCommentProps {
  export interface Props extends CommentProps.Props {
    answerId: UniqueEntityUUID
  }
  export interface Id {
    answerCommentId: string
  }
}

export class AnswerCommentEntity extends CommentEntity<AnswerCommentProps.Props> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps.Props, 'createdAt'>,
    id?: UniqueEntityUUID,
  ) {
    const answerComment = new AnswerCommentEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
