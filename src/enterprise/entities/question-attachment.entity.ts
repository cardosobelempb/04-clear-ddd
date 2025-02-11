import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace QuestionAttachmentProps {
  export interface Props {
    questionId: UniqueEntityUUID
    attachmentId: UniqueEntityUUID
  }
}

export class QuestionAttachmentEntity extends Entity<QuestionAttachmentProps.Props> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentProps.Props, id?: UniqueEntityUUID) {
    const questionAttachment = new QuestionAttachmentEntity(props, id)

    return questionAttachment
  }
}
