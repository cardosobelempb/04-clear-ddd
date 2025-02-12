import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace AnswerAttachmentProps {
  export interface Props {
    answerId: UniqueEntityUUID
    attachmentId: UniqueEntityUUID
  }
}

export class AnswerAttachmentEntity extends Entity<AnswerAttachmentProps.Props> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentProps.Props, id?: UniqueEntityUUID) {
    const answerAttachment = new AnswerAttachmentEntity(props, id)
    return answerAttachment
  }
}
