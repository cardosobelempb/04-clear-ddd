import { UniqueEntityUUID } from './value-objects/unique-entity-uuid/unique-entity-uuid'

export class Entity<Props> {
  private _id: UniqueEntityUUID
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityUUID) {
    this.props = props
    this._id = id ?? new UniqueEntityUUID(id)
  }

  get id() {
    return this._id
  }
}
