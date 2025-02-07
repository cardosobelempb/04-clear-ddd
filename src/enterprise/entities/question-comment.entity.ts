import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@/shared/enterprise/types/optional'

import { CommentEntity, CommentProps } from './comment.entity'

export namespace QuestionCommentProps {
  export interface Props extends CommentProps.Props {
    questionId: UniqueEntityUUID
  }
  export interface Id {
    questionCommentId: string
  }
}

export class QuestionCommentEntity extends CommentEntity<QuestionCommentProps.Props> {
  get questionId() {
    return this.props.questionId
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
