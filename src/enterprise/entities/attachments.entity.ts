import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace AttachmentProps {
  export interface Props {
    title: string
    link: string
  }
}

export class AttachmentEntity extends Entity<AttachmentProps.Props> {
  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
  }

  get link() {
    return this.props.link
  }

  set link(link: string) {
    this.props.link = link
  }

  static create(props: AttachmentProps.Props, id?: UniqueEntityUUID) {
    const attachment = new AttachmentEntity(props, id)
    return attachment
  }
}
