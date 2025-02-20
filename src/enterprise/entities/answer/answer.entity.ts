import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '@/shared/enterprise/types/optional'

import { AnswerAttachmentListEntity } from './answer-attachment-list.entity'
import { AggregateRoot } from '@/shared/enterprise/entities/aggregate-root'
import { AnswerCreatedEvent } from './events/answer-create.event'

export namespace AnswerProps {
  export interface Props {
    authorId: UniqueEntityUUID
    questionId: UniqueEntityUUID
    content: string
    attachments: AnswerAttachmentListEntity
    createdAt: Date
    updatedAt?: Date
  }
  export interface Id {
    answerId: string
  }
}

export class AnswerEntity extends AggregateRoot<AnswerProps.Props> {
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

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: AnswerAttachmentListEntity) {
    this.props.attachments = attachments
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

  static create(props: Optional<AnswerProps.Props, 'createdAt' | 'attachments'>, id?: UniqueEntityUUID) {
    const answer = new AnswerEntity(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentListEntity(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewAnswer = !id

    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}
